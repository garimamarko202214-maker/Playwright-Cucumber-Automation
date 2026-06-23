---
name: destructive-scenario-skip-pattern
description: For Cucumber scenarios that mutate shared system state (e.g. cancel a Confirmed booking), gate the scenario with a Then step that calls this.skip() when preconditions are absent — making re-runs idempotent.
metadata:
  type: feedback
---

For Cucumber scenarios in this project that perform destructive actions (e.g. `TC-BOOK-002` cancels a Confirmed booking), the second run of the suite will fail because the system state has changed and there is no Confirmed booking left to cancel. Do NOT try to "restore" state via UI — accept the side-effect and skip gracefully.

**Why:** The user explicitly asked for idempotency on re-runs. Cancelled bookings cannot be re-Confirmed via the EventHub UI, so the only way to keep the suite green on repeated runs is to mark the scenario as pending/skipped when the precondition is missing.

**How to apply:**
1. Add a `Then` step early in the scenario that checks the precondition (e.g. "user verifies a Confirmed booking is available for cancellation"). If the precondition is absent, call `this.skip()`.
2. `this.skip()` is on the runtime Cucumber `World` instance but is not in the declared `World` type. Add `skip(): never;` to the `CustomWorld` declaration in the step file so TS compiles.
3. The step file should still bind `Then` for the gate phrase (rather than `Given`) because `Given` blocks are evaluated before `When` and skipping a `Given` interrupts the scenario differently from a `Then` skip.
4. The skip call should be paired with `return;` for clarity even though `skip` returns `never` — TS will warn the `return` is unreachable, which is fine.
5. Document the skip behavior in a comment so future maintainers know it is intentional, not a bug.
6. Related: [[bookings-empty-state-strategy]] takes a different approach (cancel-all-then-verify-empty) for TC-BOOK-003, which is a distinct scenario that owns its destructive action rather than depending on a Confirmed booking.
