import { Altcoin, BtcPosition, BtcMetric } from "@ontology/sdk";
import { Client } from "@osdk/client";
import { Double } from "@osdk/functions";

/**
 * Computes:
 *   - portfolioValue: sum of (position × latest price) for all altcoins
 *                     (same logic as getTotalSupplyValue)
 *   - btcValue:       BTC position × latest BTC price
 *                     (drawn from the BtcPosition and BtcMetric object types)
 *
 * Returns the product: btcValue × portfolioValue.
 */
async function getFrequency(client: Client): Promise<Double> {
  // ── Portfolio value (mirrors getTotalSupplyValue) ──────────────────
  const allAltcoins = await client(Altcoin).fetchPage({ $pageSize: 100 });
  let portfolioValue = 0;

  for (const altcoin of allAltcoins.data) {
    // Get linked position
    const positionPage = await client(Altcoin)
      .where({ assetId: altcoin.assetId })
      .pivotTo("altcoinPositionsBackingDataSet")
      .fetchPage();
    const position = positionPage.data[0];
    if (!position) continue;

    // Get latest price
    const metricsPage = await client(Altcoin)
      .where({ assetId: altcoin.assetId })
      .pivotTo("altcoinMetrics")
      .fetchPage({
        $orderBy: { timestamp: "desc" },
        $pageSize: 1,
      });
    const latest = metricsPage.data[0];
    if (!latest) continue;

    const quantity = Number(position.position);
    const price = Number(latest.price);
    if (isNaN(quantity) || isNaN(price)) continue;

    portfolioValue += quantity * price;
  }

  // ── BTC value (BTC position × latest BTC price) ───────────────────
  let btcValue = 0;

  const btcPositionPage = await client(BtcPosition).fetchPage({ $pageSize: 1 });
  const btcPosition = btcPositionPage.data[0];

  if (btcPosition) {
    const btcQuantity = Number(btcPosition.positions);

    const btcMetricsPage = await client(BtcMetric).fetchPage({
      $orderBy: { timestamp: "desc" },
      $pageSize: 1,
    });
    const latestBtcMetric = btcMetricsPage.data[0];

    if (latestBtcMetric && !isNaN(btcQuantity)) {
      const btcPrice = Number(latestBtcMetric.price);
      if (!isNaN(btcPrice)) {
        btcValue = btcQuantity * btcPrice;
      }
    }
  }

  // ── Result ─────────────────────────────────────────────────────────
  return  portfolioValue / btcValue * 50;
}

export default getFrequency;
