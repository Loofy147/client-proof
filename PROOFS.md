# Proof Catalog

Public index of client-facing engineering evidence.

| ID | Proof | Problem class | Status |
|---|---|---|---|
| MCP-REST-001 | MCP → REST Integration | Expose a third-party REST resource through MCP | PORTFOLIO PROOF |
| API-INTEGRATION-001 | Webhook → REST Integration | Validate, normalize and deliver API events | EXPERIMENTALLY SUPPORTED |
| WORKFLOW-001 | Verified Workflow Conversion | Turn a repetitive workflow into an explicit action + verification path | EXPERIMENTALLY SUPPORTED |
| AUTOMATION-REPAIR-001 | Idempotent Workflow Repair | Prevent duplicate effects during retries | EXPERIMENTALLY SUPPORTED |

## Selection rule

Each proof exists to support a concrete commercial problem. A proof is not added merely because it is an interesting technical project.

## Next proof families

- AGENT-RUNTIME-001 — bounded agent/runtime execution.
- DATA-PIPE-001 — structured data transformation.
- BROWSER-AUTO-001 — browser automation.

Each remains OPEN until its implementation and reproducible evidence satisfy `PROOF_STANDARD.md`.

## Verification note

API-INTEGRATION-001, WORKFLOW-001, and AUTOMATION-REPAIR-001 have reproducible local test evidence in the development environment used for this catalog.
MCP-REST-001 has implementation and test code present, but its full MCP SDK execution has not yet produced a CI run receipt in this environment.