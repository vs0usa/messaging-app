# Testing

## Unit Tests

Unit tests are located near the code they test inside `apps/api` and `apps/web`.

## E2E Tests

E2E tests are exclusively located in the `packages/web-tests` directory. As the name suggests, they are used to test the web application.

## Testing Commands

- `pnpm test:run` - Run unit tests
- `pnpm e2e:test` - Run E2E tests
- `pnpm dev:test` - Run E2E tests in development mode

## Testing Coverage

- `pnpm test:coverage` - Generate test coverage report
- `pnpm e2e:test:coverage` - Generate E2E test coverage report

## Setting up Playwright

After installing the dependencies, you need to install the Playwright browsers.

```bash
pnpm exec playwright install
```
