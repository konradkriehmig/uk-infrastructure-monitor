import { Altcoin } from "@ontology/sdk";
import { Client } from "@osdk/client";
import { Double } from "@osdk/functions";

async function getTotalSupplyValue(client: Client): Promise<Double> {
  const allAltcoins = await client(Altcoin).fetchPage({ $pageSize: 100 });
  let total = 0;

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
    if (!isNaN(quantity) && !isNaN(price)) {
      total += quantity * price;
    }
  }

  return total;
}

export default getTotalSupplyValue;
