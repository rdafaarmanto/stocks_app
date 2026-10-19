import "dotenv/config";
import assert from "node:assert/strict";
import { test } from "node:test";
import { searchStocks } from "../../lib/actions/finnhub.actions";

const hasFinnhubConfig = Boolean(
  process.env.FINNHUB_BASE_URL && process.env.FINNHUB_API_KEY,
);

test(
  "searchStocks returns AAPL from the Finnhub search API",
  { skip: !hasFinnhubConfig, timeout: 15_000 },
  async () => {
    const stocks = await searchStocks("AAPL");
    const apple = stocks.find((stock) => stock.symbol === "AAPL");

    assert.ok(
      apple,
      "Finnhub returned no AAPL result. Check the API key, base URL, and server logs.",
    );
    assert.ok(apple.name, "Finnhub result is missing the stock name.");
    assert.equal(typeof apple.exchange, "string");
    assert.equal(typeof apple.type, "string");
  },
);
