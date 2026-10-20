
# SauceDemo BDD Automation Framework

## Overview

This project automates SauceDemo using JavaScript, Playwright,
Cucumber.js and the Page Object Model (POM).

It covers a successful single-product purchase and invalid login.

## Architecture

- features/: Gherkin scenarios
- steps/: Cucumber step definitions
- pages/: Page Objects and centralized locators
- support/: Browser setup, World, hooks, screenshots, logging and DB utility
- config/: Environment configuration
- testdata/: User and checkout fixtures

## Prerequisites

- Node.js LTS
- npm
- Git (optional)

## Setup

```bash
npm install
npx playwright install chromium
```

Copy `.env.example` to `.env` and adjust the configuration.

## Run tests

Run all scenarios:

```bash
npm test
```

Run smoke tests:

```bash
npm run test:smoke
```

Run only negative scenarios:

```bash
npm run test:negative
```

Run only purchase scenarios:

```bash
npm run test:purchase
```

Run with a visible browser:

```bash
npm run test:headed
```

## Browser configuration

Edit `.env`:

```dotenv
BROWSER=chromium
HEADLESS=true
SLOW_MO=0
```

Supported browser names: chromium, firefox and webkit.
Install the corresponding Playwright browser before using it.

## Failure screenshots

Failed scenarios attach screenshots to Cucumber output and save
PNG files under `artifacts/screenshots/`.

## Locator Strategy for Adding “Sauce Labs Backpack”

Preferred approach:
Locate the inventory-item container using its exact product name,
then locate the Add to cart button inside that container.

Fallback approach:
Locate the product through its accessible link name, scope the
search to the matching inventory item, and click its Add to cart button.

Both approaches avoid index-based selection and brittle XPath chains.

## Wait strategy

Playwright auto-waits for actionability and retries locator assertions.
Explicit waits are used only when a particular state or URL transition
needs to be observed. No arbitrary hard sleeps are used in the UI flow.

## Database validation

SauceDemo does not provide application DB access for this exercise.
The PostgreSQL utility demonstrates configurable connection pooling,
parameterized queries, error handling, retry-based record validation
and explicit connection teardown. Real DB assertions require an
application with an accessible test database and a known schema.

## Why this framework structure?

The separation between Gherkin, steps, Page Objects, configuration,
test data and utilities improves readability and maintainability.
Selectors remain centralized, while steps describe business behavior.

## How does the locator strategy improve stability?

Product-scoped locators combine an exact product name with a button
inside its container. This avoids selecting controls by list position.
Accessible roles and stable data-test attributes are preferred.

## How would you scale to 50+ scenarios?

- Reuse Page Objects and common step definitions.
- Group scenarios with tags such as @smoke and @regression.
- Use scenario-isolated browser contexts and independent test data.
- Introduce API-based setup and cleanup where available.
- Add structured reports, CI artifacts and flake tracking.
- Split test suites across CI workers after verifying test independence.

## How would you execute this in CI/CD?

Use a pipeline to install Node.js dependencies and Playwright browsers,
run the tagged test suite, publish reports and screenshots, and fail
the build when required tests fail. Store secrets in the CI secret
manager, not in source control.

## Two improvements with more time

1. Add an HTML report with scenario-level logs and screenshots.
2. Add a dedicated test environment with API/database validation,
   unique test data, and deterministic cleanup.

## Assumptions

- SauceDemo is used as the demo UI.
- Standard demo credentials are used for the happy path.
- PostgreSQL is an illustrative database integration.
- The sample database schema is not a verified SauceDemo schema.
- UI tests do not claim to verify a real SauceDemo database record.

## AI / Copilot usage disclosure

AI assistance was used to draft the initial framework structure,
example Page Objects, BDD steps, database integration template,
and documentation.

Before submission, the author must run the tests, verify locator
behavior, check runtime compatibility, review security and cleanup,
and modify the solution based on observed behavior. The final
submission should accurately describe any changes personally made.
