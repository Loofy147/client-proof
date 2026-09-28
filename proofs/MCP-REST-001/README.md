# MCP-REST-001 — MCP → REST Integration

**Status:** Portfolio proof

## Client problem

Expose a third-party REST resource through an MCP-capable client with a small, typed integration surface.

## What is included

- Node.js MCP server;
- typed and validated tool input;
- REST endpoint mapping;
- optional Bearer authentication;
- structured JSON propagation;
- explicit HTTP error propagation;
- an in-process MCP client integration test;
- HTTP and stdio entry points.

## Architecture

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

## Run

From this directory:

```bash
npm install
npm run check
npm test
```

The tests use a deterministic in-process REST mock. They do not contact customer systems.

## Commercial mapping

For a paid Phase 1, the example resource can be replaced with the client's actual REST endpoints and schemas, with authentication, error handling, tests, deployment configuration, and handoff evidence scoped to the supplied brief.

## Evidence boundary

This is a portfolio proof, not a named customer deployment. No customer delivery is claimed by this repository.

The repository is intentionally self-contained so clients can inspect the implementation without accessing internal research or proposal repositories.

## Files

- `src/server.js` — MCP tool and REST mapping.
- `src/http.js` — HTTP entry point.
- `src/stdio.js` — stdio entry point.
- `test/integration.test.js` — MCP client + REST integration tests.
- `package.json` — minimal runtime/test dependencies.