import "dotenv/config";
import { after, before, describe, it } from "node:test";
import { connectToDB } from "@/database/mongoose";
import mongoose from "mongoose";
import assert from "node:assert/strict";

describe("MongoDB Connection", () => {
  before(async () => {
    await connectToDB();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it("should connect to MongoDB successfully", () => {
    assert.equal(mongoose.connection.readyState, 1);
    assert.ok(mongoose.connection.db);
  });

  it("should reuse the cached connection", async () => {
    const first = await connectToDB();
    const second = await connectToDB();

    assert.strictEqual(first, second);
  });
});
