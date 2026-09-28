# AUTOMATION-REPAIR-001 — Idempotent Workflow Repair

**Status:** EXPERIMENTALLY SUPPORTED

## Client problem

An existing automation can retry after a timeout and accidentally duplicate the same business effect.

## Repair

Add a stable idempotency key and a bounded execution rule so the same logical event produces at most one accepted effect in the controlled execution model.

## Flow

```
event
  ↓
idempotency key
  ↓
check prior effect
  ├─ already applied → return existing receipt
  └─ not applied → execute once
             ↓
          verify
             ↓
           receipt
```

## Commercial mapping

Useful for automation repair/stabilization work involving webhooks, CRM updates, payment/status events, lead routing, or any workflow where retries can duplicate an external effect.

## Evidence

The proof includes deterministic tests for first execution, duplicate suppression, and failed verification.

## Evidence boundary

This is a controlled portfolio implementation. It does not claim a customer deployment or provider-specific n8n/Make production history.
