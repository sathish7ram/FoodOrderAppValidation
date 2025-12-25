# Playwright Test Suite — Page Object Model (POM)

This repository contains Playwright tests organized using the Page Object Model (POM) pattern.

Purpose
- Provide stable, maintainable end-to-end tests for the ordering flow.

Quick structure
- `tests/` — Playwright tests.
  - `pages/` — Page objects encapsulating selectors and actions (POM classes).
  - `utils/` — Small helpers (e.g. `logger.js`).
- `playwright.config.js` — Playwright configuration.

Conventions & POM guidelines
- One page object per logical page or region. Class names should be `PascalCase`, files `CamelCase` or `PascalCase` (e.g. `OrderPage.js`).
- Page objects expose high-level actions (business intent) rather than low-level clicks. Prefer `addToCart()` over `clickButtonX()` unless reused.
- Keep selectors inside page objects. Use semantic locators when possible (`getByRole`, `getByLabel`, `getByTestId`). Avoid brittle absolute XPaths.
- Encapsulate waits inside POM methods. Tests should assume actions are reliable and declarative.
- Add logging inside POM methods to improve observability during test runs. See `tests/utils/logger.js` for a simple timestamped logger.
- For third-party elements (e.g. Stripe iframes), keep best-effort fills inside POM and do not fail the entire test if frames are missing, unless the test intends to validate payment.

Recommended page-object pattern
1. Constructor receives `page` and defines locators (e.g. `this.searchBox = page.getByRole('textbox', { name: /search menu/i })`).
2. Expose async methods for interactions (`async searchAndOpenItem(text)`).
3. Each method should `log()` start/end, wait for visibility, perform the action, and optionally assert post-conditions.

Running tests
- Run a single test (headed Chromium):
```powershell
npx playwright test tests/TestAutoCode.spec.js --project=chromium --headed
```
- Run all tests and open HTML report after:
```powershell
npx playwright test
npx playwright show-report
```

Cleaning state
- To ensure a clean session before navigation, clear cookies via the page context: `await page.context().clearCookies()`.
- If you need to clear `localStorage`/`sessionStorage`, navigate to the app origin and use `page.evaluate(() => localStorage.clear())`.

Logging
- This repo includes `tests/utils/logger.js` which prints ISO8601 timestamps with action names to the console. Consider writing logs to a file for CI persistence.

Best practices
- Add `data-testid` attributes in the application for critical controls to make locators robust.
- Keep POM classes small and focused (page or component scoped), and compose them in tests for full flows.
- Keep assertions in tests; POM methods should return values or states that tests assert on.

If you'd like, I can:
- Convert additional tests to POM style.
- Add a `CONTRIBUTING.md` snippet with POM rules and examples.
- Persist logs to `test-results/` per test run.

---
Generated on: December 9, 2025
