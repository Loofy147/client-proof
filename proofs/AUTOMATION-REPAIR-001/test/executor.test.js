import test from "node:test";
import assert from "node:assert/strict";
import { IdempotentExecutor } from "../src/executor.js";

test("first execution verifies and stores a receipt", async () => {
  const runner = new IdempotentExecutor();
  let calls = 0;
  const result = await runner.run(
    { id: "evt-1" },
    {
      action: async () => ({ effectId: "fx-1", calls: ++calls }),
      verify: async effect => ({ ok: effect.effectId === "fx-1" }),
    },
  );
  assert.equal(result.status, "VERIFIED");
  assert.equal(calls, 1);
});

test("duplicate event reuses receipt without executing again", async () => {
  const runner = new IdempotentExecutor();
  let calls = 0;
  const spec = {
    action: async () => ({ effectId: "fx-1", calls: ++calls }),
    verify: async () => ({ ok: true }),
  };
  const first = await runner.run({ id: "evt-2" }, spec);
  const second = await runner.run({ id: "evt-2" }, spec);
  assert.equal(first.status, "VERIFIED");
  assert.equal(second.status, "REUSED");
  assert.equal(calls, 1);
  assert.deepEqual(second.receipt, first.receipt);
});

test("failed verification is never cached as success", async () => {
  const runner = new IdempotentExecutor();
  let calls = 0;
  const first = await runner.run(
    { id: "evt-3" },
    {
      action: async () => ({ effectId: "fx-3", calls: ++calls }),
      verify: async () => ({ ok: false }),
    },
  );
  assert.equal(first.status, "UNVERIFIED");

  const second = await runner.run(
    { id: "evt-3" },
    {
      action: async () => ({ effectId: "fx-3b", calls: ++calls }),
      verify: async () => ({ ok: true }),
    },
  );
  assert.equal(second.status, "VERIFIED");
  assert.equal(calls, 2);
});
