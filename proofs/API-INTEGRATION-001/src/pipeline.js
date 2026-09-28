export function normalizeEvent(input) {
  if (!input || typeof input !== "object") {
    throw new TypeError("event must be an object");
  }
  if (typeof input.eventId !== "string" || input.eventId.length === 0) {
    throw new TypeError("eventId is required");
  }
  if (typeof input.email !== "string" || !input.email.includes("@")) {
    throw new TypeError("valid email is required");
  }

  return {
    eventId: input.eventId,
    email: input.email.trim().toLowerCase(),
    source: typeof input.source === "string" ? input.source : "unknown",
    receivedAt: new Date().toISOString(),
  };
}

export async function deliverToRest(input, {
  fetchImpl = globalThis.fetch,
  endpoint,
  apiKey,
} = {}) {
  const normalized = normalizeEvent(input);
  if (!endpoint) throw new Error("endpoint is required");

  const response = await fetchImpl(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      ...(apiKey ? { authorization: "Bearer " + apiKey } : {}),
    },
    body: JSON.stringify(normalized),
  });

  const body = await response.text();
  if (!response.ok) {
    return {
      status: "FAILED",
      eventId: normalized.eventId,
      downstreamStatus: response.status,
      evidence: { body: body.slice(0, 1000) },
    };
  }

  return {
    status: "DELIVERED",
    eventId: normalized.eventId,
    downstreamStatus: response.status,
    normalized,
    evidence: { responseBody: body.slice(0, 1000) },
  };
}
