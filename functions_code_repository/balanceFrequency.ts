import { Altcoin, AltcoinPositionsBackingDataSet } from "@ontology/sdk";
import { Client } from "@osdk/client";
import { createEditBatch, Edits } from "@osdk/functions";
import getFrequency from "./getFrequency.js";
type OntologyEdit = Edits.Object<AltcoinPositionsBackingDataSet>;

// Mapping of each coin's assetId to its increase/decrease position step size
const STEP_SIZES: Record<string, number> = {
  bnb: 1_000,
  doge: 10_000_000,
  eth: 20_000,
  sol: 100_000,
  trx: 20_000_000,
  xrp: 100_000_000,
};

/**
 * Balances the frequency towards 50 by greedily picking the single best
 * increase or decrease action each iteration.
 * Keeps running until no step can bring the frequency closer to 50, or a
 * maximum of 10 steps have been taken — whichever comes first.
 * No manual inputs required — the function fetches the current frequency,
 * latest prices, and current positions itself.
 */
async function balanceFrequency(client: Client): Promise<OntologyEdit[]> {
  const TARGET = 50;
  const MAX_STEPS = 10;

  // ── 1. Fetch the current frequency ───────────────────────────────────
  const frequency = await getFrequency(client);

  // Build a price lookup: assetId -> latest price
  // (fetch the most recent metric per asset in descending timestamp order)
  const priceByAsset: Record<string, number> = {};

  for (const assetId of Object.keys(STEP_SIZES)) {
    const metricsPage = await client(Altcoin)
      .where({ assetId })
      .pivotTo("altcoinMetrics")
      .fetchPage({ $orderBy: { timestamp: "desc" }, $pageSize: 1 });

    const latest = metricsPage.data[0];
    if (!latest) continue;
    const price = Number(latest.price);
    if (!isNaN(price)) priceByAsset[assetId] = price;
  }
  // Fetch all current positions once – we'll maintain them locally so we can
  // simulate the running state without re-querying between steps.
  const positionPage = await client(AltcoinPositionsBackingDataSet).fetchPage({
    $pageSize: 100,
  });

  // Build a mutable map: assetId -> { object, currentPosition }
  const positionByAsset: Record<
    string,
    { obj: (typeof positionPage.data)[0]; qty: number }
  > = {};
  for (const p of positionPage.data) {
    if (!p.assetId) continue;
    positionByAsset[p.assetId] = {
      obj: p,
      qty: Number(p.position ?? "0"),
    };
  }

  // We need btcValue to convert a portfolio-value change into a frequency delta.
  // frequency = (portfolioValue / btcValue) * 50
  // => btcValue = (portfolioValue / frequency) * 50   [when frequency != 0]
  //
  // We derive btcValue from the *current* frequency and current portfolioValue.
  // portfolioValue = sum(price_i * qty_i)
  let currentPortfolioValue = 0;
  for (const [assetId, { qty }] of Object.entries(positionByAsset)) {
    const price = priceByAsset[assetId];
    if (price === undefined) continue;
    currentPortfolioValue += qty * price;
  }

  // Avoid division by zero
  const currentFreq = frequency === 0 ? 1e-9 : frequency;
  const btcValue = (currentPortfolioValue / currentFreq) * TARGET;

  const allEdits: OntologyEdit[] = [];

  let runningPortfolioValue = currentPortfolioValue;

  for (let step = 0; step < MAX_STEPS; step++) {
    const currentFrequency =
      btcValue === 0 ? 0 : (runningPortfolioValue / btcValue) * TARGET;

    // Pick the action (increase OR decrease, for any coin) that brings
    // frequency closest to 50. Both directions are tested for every coin
    // so we never miss a valid move due to a global direction assumption.
    let bestAssetId: string | null = null;
    let bestDelta = 0;
    let bestNewFreq = currentFrequency;

    for (const [assetId, stepSize] of Object.entries(STEP_SIZES)) {
      const price = priceByAsset[assetId];
      if (price === undefined) continue;

      const { qty } = positionByAsset[assetId] ?? { qty: 0 };

      for (const delta of [stepSize, -stepSize]) {
        const newQty = qty + delta;
        if (newQty < 0) continue; // Positions can't go negative

        const newPortfolioValue = runningPortfolioValue + price * delta;
        const newFreq =
          btcValue === 0 ? 0 : (newPortfolioValue / btcValue) * TARGET;

        if (Math.abs(newFreq - TARGET) < Math.abs(bestNewFreq - TARGET)) {
          bestNewFreq = newFreq;
          bestAssetId = assetId;
          bestDelta = delta;
        }
      }
    }

    // Stop if no move improves over the current frequency, i.e. we're already
    // as close to 50 as the available step sizes allow
    if (
      bestAssetId === null ||
      Math.abs(bestNewFreq - TARGET) >= Math.abs(currentFrequency - TARGET)
    )
      break;

    // Apply the chosen move — all lookups are guaranteed defined at this point
    const entry = positionByAsset[bestAssetId]!;
    const price = priceByAsset[bestAssetId]!;
    const newQty = entry.qty + bestDelta;

    const batch = createEditBatch<OntologyEdit>(client);
    batch.update(entry.obj, { position: newQty });
    allEdits.push(...batch.getEdits());

    // Update local state for next iteration
    entry.qty = newQty;
    runningPortfolioValue += price * bestDelta;
  }

  return allEdits;
}

export default balanceFrequency;
