import test from "node:test";
import assert from "node:assert/strict";
import { runLeadWorkflow } from "../src/workflow.js";

test("qualified lead reaches action and requires verification", async () => {
  const result = await runLeadWorkflow(
    { email: "A@Example.com", companySize: 20 },
    {
      actionImpl: async (decision) => ({ effectId: "fx-1", target: decision.email }),
      verifyImpl: async (action) => ({ ok: action.effectId === "fx-1", observed: true }),
    },
  );

  assert.equal(result.status, "VERIFIED");
  assert.equal(result.observation.ok, true);
});

test("unqualified lead abstains before external action", async () => {
  let actionCalled = false;
  const result = await runLeadWorkflow(
    { email: "not-an-email", companySize: 20 },
    {
      actionImpl: async () => {
        actionCalled = true;
        return { effectId: "should-not-exist" };
      },
      verifyImpl: async () => ({ ok: true }),
    },
  );

  assert.equal(result.status, "ABSTAINED");
  assert.equal(actionCalled, false);
});

test("failed verification does not become success", async () => {
  const result = await runLeadWorkflow(
    { email: "a@example.com", companySize: 20 },
    {
      actionImpl: async () => ({ effectId: "fx-2" }),
      verifyImpl: async () => ({ ok: false, observed: false }),
    },
  );

  assert.equal(result.status, "UNVERIFIED");
});
