import test from "node:test";
import assert from "node:assert/strict";
import { deliverToRest } from "../src/pipeline.js";

test("valid event is normalized and delivered with auth", async () => {
  let request;
  const result = await deliverToRest(
    {
      eventId: "evt-1",
      email: " USER@Example.COM ",
      source: "web-form",
    },
    {
      endpoint: "https://api.example.test/events",
      apiKey: "demo-key",
      fetchImpl: async (url, init) => {
        request = { url: String(url), init };
        return new Response(JSON.stringify({ accepted: true }), { status: 201 });
      },
    },
  );

  assert.equal(result.status, "DELIVERED");
  assert.equal(request.url, "https://api.example.test/events");
  assert.equal(request.init.headers.authorization, "Bearer demo-key");
  assert.deepEqual(JSON.parse(request.init.body).email, "user@example.com");
});

test("downstream failure becomes explicit failed result", async () => {
  const result = await deliverToRest(
    { eventId: "evt-2", email: "a@example.com" },
    {
      endpoint: "https://api.example.test/events",
      fetchImpl: async () =>
        new Response(JSON.stringify({ error: "rate limited" }), { status: 429 }),
    },
  );

  assert.equal(result.status, "FAILED");
  assert.equal(result.downstreamStatus, 429);
});
