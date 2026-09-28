# MCP-REST-001 — MCP → REST Integration

**Status:** PORTFOLIO PROOF

## Client problem

A third-party REST API needs to be exposed to an MCP-capable client through a small, typed integration surface.

Typical Phase 1 requirements:
- REST endpoint mapping;
- API-key or Bearer authentication;
- typed tool inputs;
- structured JSON responses;
- explicit HTTP error handling;
- test coverage;
- lightweight Node.js deployment.

## What exists

A focused Node.js MCP→REST bridge was implemented as a proof artifact.

Flow:

```
MCP client
  ↓
Streamable HTTP
  ↓
typed MCP tool
  ↓
validated input
  ↓
REST request
  ↓
authentication
  ↓
structured result / explicit error
```

## Evidence

The implementation and integration test currently live in the research build repository:

- [Server implementation](https://github.com/Loofy147/Open-System-One/tree/research/self-conversion-primitive-v0/examples/mcp-rest-bridge)
- [Client-facing proposal](https://github.com/Loofy147/Open-System-One/blob/research/self-conversion-primitive-v0/commercial/2026-09-28/PROPOSAL_MCP_REST_BRIDGE.md)

The proof includes typed input validation, REST request construction, optional Bearer credential placement, structured JSON propagation, and explicit REST error propagation.

## Verification boundary

The artifact is a portfolio proof, not a named customer deployment.

The integration test is designed around a deterministic in-process REST mock. It demonstrates the integration path without sending customer credentials or data to a third-party service.

The proof should be upgraded only after the repository contains reproducible local/CI execution evidence for the exact committed version.

## Commercial scope

A corresponding paid Phase 1 can be scoped as:

```
API brief
  → endpoint/schema mapping
  → MCP tool implementation
  → authentication boundary
  → success/error tests
  → deployment configuration
  → handoff evidence
```

The implementation should remain narrow until the client's actual API requirements are known.

## What this proof does not claim

- prior customer delivery for this exact integration;
- production readiness for every REST API;
- unrestricted autonomous behavior;
- successful deployment to a customer's infrastructure.

