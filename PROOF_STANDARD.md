# Client Proof Standard

## Purpose

Define the minimum contract for every public client-facing proof in this repository.

## Required sections

Each proof must state:

- Problem
- Outcome
- Implementation
- Verification
- Evidence
- Limits
- Commercial mapping

## Evidence status

Use exactly one status:

- PORTFOLIO PROOF — implementation exists; customer deployment is not claimed.
- EXPERIMENTALLY SUPPORTED — the exact committed artifact has reproducible execution evidence.
- CUSTOMER DELIVERED — only with auditable customer-delivery evidence.

## Prohibited upgrades

Do not upgrade status because:

- the code looks complete;
- a test file exists but was not run;
- a local result was assumed to be CI evidence;
- a prototype is technically similar to a customer system;
- the model reports that an action succeeded.

## Self-containment

A proof should be inspectable without requiring access to internal repositories.
Internal research may be referenced for context, but it must not be a prerequisite for understanding the proof.

## Commercial boundary

Every proof should identify the smallest paid service that the demonstrated capability supports.
Do not promise outcomes that the proof cannot establish.

## Naming

Use stable IDs:

`<DOMAIN>-<NUMBER>`

Examples: `MCP-REST-001`, `API-INTEGRATION-001`, `WORKFLOW-001`.