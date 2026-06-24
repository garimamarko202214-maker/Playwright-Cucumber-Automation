# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Common Commands

**Dependency Management**
- Install all dependencies (including Playwright browsers):
  ```bash
  npm ci
  npx playwright install --with-deps
  ```
- `package.json` has no `scripts` — invoke binaries directly via `npx`.

**Running Tests**
- **Cucumber (Gherkin) tests** — the primary suite for this project. Step definitions are in TypeScript and `ts-node` is registered via `cucumber.js`:
  ```bash
  npx cucumber-js                                      # run all features
  npx cucumber-js src/tests/features/<file>.feature    # one feature file
  npx cucumber-js --tags "@events"                     # one scenario by tag
  npx cucumber-js --tags "@smoke"                      # by Cucumber tag
  ```
- **Playwright test runner** — for `.spec.ts` files under `src/tests`:
  ```bash
  npx playwright test
  npx playwright test path/to/file.spec.ts
  npx playwright test --grep "test name"
  ```
  Note: `playwright.config.ts` is pinned to an absolute `testDir` (`/Users/harsh/PlaywrightProject/src/tests`) — paths passed on the CLI must be absolute to be matched. This hard-coded path means the runner won't resolve correctly outside that specific macOS machine; rely on Cucumber unless you fix this path.


**Debugging / Development**
- Add a `@debug` tag to a scenario in the `.feature` file, then run:
  ```bash
  npx cucumber-js --tags "@debug"
  ```
- The Cucumber `Before` hook in `src/tests/support/hooks.ts` launches Chromium with `headless: false` — debugging runs visibly by default. To override for Playwright runner tests, use `npx playwright test --headed`.
- `debug-events.js` is a standalone Node script that drives Chromium directly against EventHub — useful for quick DOM probes outside the Cucumber/Playwright harness. Run with `node debug-events.js`.

**Reports**
- HTML Playwright report is written to `playwright-report/`.
- Cucumber JSON report is written to `reports/cucumber-report.json` (configured in `cucumber.js`).
- Generate a human-readable HTML Cucumber report after a run:
  ```bash
  node generate-report.js   # reads reports/cucumber-report.json → reports/cucumber-report.html
  ```

**CI / GitHub Actions**
- `.github/workflows/cucumber-tests.yml` runs on push/PR to `main`/`master`/`develop`: `npm install` → `npx playwright install --with-deps` → `npx cucumber-js --tags "@events"` → generates HTML report → uploads `cucumber-report` and `playwright-report` artifacts and comments the PR with pass/fail counts.

---

## High‑Level Architecture

- **Two test frameworks coexist**: **Cucumber** for BDD-style Gherkin features (`src/tests/features/*.feature`) and **Playwright Test** for any `.spec.ts` files. The `playwright.config.ts` runner ignores `.feature` files; Cucumber ignores `.spec.ts` files. Step code is shared between them — it uses `@playwright/test`'s `Locator` / `expect` APIs.
- **TypeScript + ts-node**: `cucumber.js` registers `ts-node/register` so step definitions, hooks, and the custom world run as TypeScript without a separate build step. `tsconfig.json` targets ES2020 with CommonJS modules.
- **Page Object Model (POM)**:
  - `src/tests/locators/test.locator.ts` defines a single `TestPage` class that holds locators for **every** flow in the suite — login, Events listing, Add Event form, My Bookings, and Cancel Booking. Locators are grouped by feature with section comment headers (e.g. `// --- My Bookings page locators ---`). New locators for an existing flow should be added in the appropriate section rather than as new classes.
  - `src/tests/locators/POManager.ts` provides a `PageManager` facade that lazy-instantiates page objects — access via `this.pageLocator.testPage`. Add a new page object by creating a new class in `src/tests/locators/`, then add a private cached field + lazy getter on `PageManager`.
  - `TestPage` also exposes small **helper action methods** (e.g. `clickCancelOnFirstConfirmed()`, `confirmCancellation()`, `waitForCancelModal()`) that encapsulate multi-step Playwright interactions so step definitions stay declarative and a DOM change only requires patching one place.
- **Custom World** (`src/tests/support/world.ts`): Extends Cucumber's `World` with `browser`, `context`, `page`, and `pageLocator: PageManager`. The `setWorldConstructor(CustomWorld)` call binds it to every scenario. Step files can extend `CustomWorld` (via TypeScript declaration merging) to add scenario-local state — see `my-bookings.ts` for the `preCancelEventName` / `preCancelStatusText` / `skip()` pattern.
- **Hooks** (`src/tests/support/hooks.ts`): `Before` launches a new Chromium browser/context/page and wires up the `PageManager`; `After` closes them. This means **each scenario gets a fresh browser** — there is no shared state across scenarios.
- **Application Under Test**: EventHub at `https://eventhub.rahulshettyacademy.com/`. Step definitions hardcode the base URL and the demo credentials (`manish123@gmail.com` / `Manish9@@`) in `src/tests/steps/test.ts` (login step) and `src/tests/steps/cancel-booking.ts` (background step).
- **Source-of-truth test case JSONs** sit at the repo root (`test-cases-events.json`, `test-cases-my-bookings.json`) and under `test-cases/` (`cancel-booking-test-cases.json`). Each `*.feature` file's `@TC_*` tags map 1:1 to a `testCaseId` in one of these JSONs — keep them in sync when adding scenarios.

---

## Important Files & Entry Points

- `cucumber.js` — Cucumber CLI config: registers `ts-node`, points to step/support globs, and to `src/tests/features/**/*.feature`. Wires the JSON report to `reports/cucumber-report.json`.
- `playwright.config.ts` — Playwright runner config. Single Chromium project, HTML reporter, `trace: 'on-first-retry'`. `testDir` is an absolute macOS path — likely-broken on other machines; prefer Cucumber.
- `src/tests/steps/test.ts` — original step definitions covering login + add-event flow. Reuse these step phrases when adding new scenarios (e.g. `Given user login into the app` is shared across feature files).
- `src/tests/steps/cancel-booking.ts` — step definitions for the cancel-booking flow (currently the only scenario-bearing step file on disk).
- `src/tests/locators/POManager.ts` and `src/tests/locators/test.locator.ts` — extend these to add new page objects/locators. The single `TestPage` class holds locators for **every** flow in the suite, grouped by feature with section headers — add new locators to the appropriate section rather than creating new classes unless a new page object is warranted.
- `src/tests/support/world.ts` and `src/tests/support/hooks.ts` — extend the custom world for cross-scenario state; modify hooks with care (they run for every scenario).
- `debug-events.js` — ad-hoc DOM probe script (bypasses Cucumber/Playwright harness).
- `generate-report.js` — converts `reports/cucumber-report.json` → `reports/cucumber-report.html` via `cucumber-html-reporter`.
- `.github/workflows/cucumber-tests.yml` — CI pipeline (Cucumber only, not the Playwright runner).
- **Test case JSONs** (source of truth for `@TC_*` tags): `test-cases-events.json`, `test-cases-my-bookings.json` at repo root, and `test-cases/cancel-booking-test-cases.json`. Keep these in sync with feature scenario tags.

> **Working tree note**: As of the last update, `src/tests/features/test.feature`, `events.feature`, and `my-bookings.feature` are deleted from the working tree, and `src/tests/steps/cancel-booking.ts` is newly added. `cancel-booking.feature` is the only feature file currently present. If the deleted features are restored, the step files `src/tests/steps/events.ts` and `my-bookings.ts` (if added) must accompany them.

---

## MCP Servers

- The project ships with a Playwright MCP server declared in `.mcp.json` at the repo root:
  ```json
  { "mcpServers": { "playwright": { "command": "npx", "args": ["-y", "@playwright/mcp"] } } }
  ```
  It launches a real Chromium via `npx @playwright/mcp` and exposes browser tools (`mcp__playwright__*` — navigate, snapshot, click, fill, etc.) for ad‑hoc exploration of the EventHub app. **Prefer these tools over WebFetch** when investigating live UI state, locating selectors, or verifying flows on `https://eventhub.rahulshettyacademy.com/`. The server is project‑scoped — on first use in a session, Claude Code will prompt for approval before connecting.

---

## Conventions Specific to This Repo

- **Adding a Cucumber scenario**: Create or extend a `.feature` file in `src/tests/features/`, write matching step phrases in `src/tests/steps/` (one step file per feature), and add any new locators to `TestPage` in the appropriate section (and expose them via `PageManager` only if you add a new page object class). Step phrases must match the wording in the feature file exactly.
- **Adding a new page object**: Create a new locator class in `src/tests/locators/`, add a private cached field + lazy getter on `PageManager`, then access it from steps as `this.pageLocator.<yourPage>`. For most flows, just extend `TestPage` instead.
- **Step phrase reuse**: Phrases like `Given user login into the app` are defined once in `test.ts` and reused across feature files. Add new shared phrases there; feature-specific phrases go in the matching step file.
- **Browser isolation is automatic** — do not assume state persists between scenarios (each scenario gets a fresh browser).
- **Hardcoded test data**: Credentials and the base URL are currently inline in `src/tests/steps/test.ts` and `cancel-booking.ts`. If you add more environments or credentials, refactor to a config module rather than spreading hardcoded values.
- **Debugging steps**: Insert `debugger;` inside a step definition and re-run with the `@debug` tag, or attach VS Code's debugger to the running Cucumber/Playwright process.
- **Test case JSON ↔ feature sync**: Each scenario should have a `@TC_*` tag matching a `testCaseId` in the corresponding `test-cases*.json` JSON. Update the JSON when adding/removing scenarios.
