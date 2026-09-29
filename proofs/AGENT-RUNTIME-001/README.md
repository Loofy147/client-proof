# AGENT-RUNTIME-001 — Bounded Agent Runtime

**Status:** EXPERIMENTALLY SUPPORTED

## Client problem

An AI agent needs to request useful actions without allowing model output itself to become execution authority.

## Implementation evidence

The Android runtime separates reasoning from effect authority and routes actions through:

```
Activation / reasoning request
  → Action
  → Policy
  → Approval
  → Egress
  → Run
  → Capability Invocation
  → Capability Executor
  → Observation
  → Verification
  → Evidence
```

Repository:
https://github.com/Loofy147/Llms-mcp-android

Reference implementation commit:
`0fccaea041c9dc39a1183f44418897e43433f73a`

## Verification evidence

CI on the referenced merged commit completed successfully on 2026-09-05 for JVM tests, debug APK build, and artifact upload.

## Commercial mapping

Useful when an AI assistant must execute bounded tools/actions rather than only generate text, especially where policy, approval, authentication/egress, execution state, and verification need explicit boundaries.

## Limits

The available CI evidence does not establish real-device or production deployment evidence. Android process-death/restart integration, capability-specific reconciliation with external systems, and some security gates remain open in the source project.
