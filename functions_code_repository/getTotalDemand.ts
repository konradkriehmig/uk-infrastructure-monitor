import { Altcoin, AltcoinMetric, AltcoinPositionsBackingDataSet } from "@ontology/sdk";
import { Client, Osdk } from "@osdk/client";
import { Double } from "@osdk/functions";

async function getPortfolioValue(
    client: Client,
    altcoin: Osdk.Instance<Altcoin>
): Promise<Double | undefined> {
    // Get linked position
    const positionPage = await client(Altcoin)
        .where({ assetId: altcoin.assetId })
        .pivotTo("altcoinPositionsBackingDataSet")
        .fetchPage();
    const position = positionPage.data[0];
    if (!position) return undefined;

    const quantity = position.position;
    if (quantity === undefined) return undefined;

    // Get linked metrics, most recent first
    const metricsPage = await client(Altcoin)
        .where({ assetId: altcoin.assetId })
        .pivotTo("altcoinMetrics")
        .fetchPage({
            $orderBy: { timestamp: "desc" },
            $pageSize: 1,
        });
    const latest = metricsPage.data[0];
    if (!latest) return undefined;

    const price = latest.price;
    if (price === undefined) return undefined;

    return Number(quantity) * price;
}

export default getPortfolioValue;