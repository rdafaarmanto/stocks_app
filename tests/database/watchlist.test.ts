import { Watchlist } from "@/database/models/watchlist.model";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

describe("Watchlist model", () => {
  it("should uppercase symbol", () => {
    const item = new Watchlist({
      userId: "user-123",
      symbol: "bbca",
      company: "PT Bank Central Asia Tbk.",
    });

    assert.equal(item.symbol, "BBCA");
  });

  it("should set addedAt by default", () => {
    const before = new Date();

    const item = new Watchlist({
      userId: "user-123",
      symbol: "BBCA",
      company: "PT Bank Central Asia Tbk.",
    });

    const after = new Date();

    assert.ok(item.addedAt instanceof Date);
    assert.ok(item.addedAt >= before);
    assert.ok(item.addedAt <= after);
  });

  it("should normalize symbol and trim company name", () => {
    const item = new Watchlist({
      userId: "user-123",
      symbol: " BBCA  ",
      company: "  PT Bank Central Asia Tbk. ",
    });

    assert.equal(item.userId, "user-123");
    assert.equal(item.symbol, "BBCA");
    assert.equal(item.company, "PT Bank Central Asia Tbk.");
    assert.ok(item.addedAt instanceof Date);
  });

  it("should require userId, symbol, and company", () => {
    const item = new Watchlist({
      symbol: "BBCA",
    });

    const error = item.validateSync();

    assert.ok(error);
    assert.match(error.message, /userId/);
    assert.match(error.message, /company/);
  });

  it("should reject blank required fields", () => {
    const item = new Watchlist({
      userId: "",
      symbol: "   ",
      company: "    ",
    });

    const error = item.validateSync();

    assert.ok(error);
    assert.match(error.message, /userId|symbol|company/);
  });
});
