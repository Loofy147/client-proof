# DURABLE-EXECUTION-001 — Recoverable Execution

**Status:** EXPERIMENTALLY SUPPORTED

## Client problem

Retries and process restarts can accidentally execute the same logical operation more than once or lose the execution record.

## Implementation evidence

`m0-durable-run` implements a minimal execution core with append-only state, stable `run_id` idempotency, and persistence in SQLite.

Repository:
https://github.com/Loofy147/m0-durable-run

## Verification evidence

The repository records executed evidence for:

- same-`run_id` retry without re-execution;
- new-`run_id` execution;
- append-only record behavior;
- recovery after a real OS process restart using the same SQLite file;
- end-to-end Experiment → Run → Evidence flow.

## Commercial mapping

Useful for agent/workflow systems where a retry, crash, or restart must not silently turn one logical request into duplicate side effects.

## Limits

The repository explicitly leaves the live provider/model call open and does not claim a production external-system integration. It is evidence for the durable execution boundary itself.
