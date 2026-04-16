import asyncio
import json
import os
import requests
import websockets

FOUNDRY_TOKEN = os.environ["FOUNDRY_TOKEN"]
DATASET_RID = os.environ["DATASET_RID"]
FOUNDRY_URL = os.environ["FOUNDRY_URL"]

SYMBOLS = [
    "btcusdt", "ethusdt", "xrpusdt", "bnbusdt", "solusdt",
    "trxusdt", "dogeusdt", "usdcusdt", "usdsusdt", "wbtcusdt"
]

STREAMS = "/".join([f"{s}@trade" for s in SYMBOLS])
BINANCE_URL = f"wss://stream.binance.com:9443/ws/{STREAMS}"

BATCH_SIZE = 50
batch = []

def push_to_foundry(records):
    response = requests.post(
        FOUNDRY_URL,
        data=json.dumps({"records": records}),
        headers={
            "Authorization": "Bearer " + FOUNDRY_TOKEN,
            "Content-Type": "application/json",
        }
    )
    if response.status_code != 204:
        print(f"Foundry error: {response.status_code} {response.text}")
    else:
        print(f"Pushed {len(records)} records")

async def main():
    print(f"Connecting to Binance with {len(SYMBOLS)} symbols...")
    async with websockets.connect(BINANCE_URL) as ws:
        print("Connected")
        while True:
            msg = json.loads(await ws.recv())
            record = {
                "timestamp": msg["T"],
                "symbol": msg["s"],
                "price": float(msg["p"]),
                "volume": float(msg["q"]),
            }
            batch.append(record)
            if len(batch) >= BATCH_SIZE:
                push_to_foundry(batch.copy())
                batch.clear()

asyncio.run(main())