# Testing

This project has a combination of unit tests and E2E tests.

## Unit Tests

Unit tests are located near the code they test inside `apps/api` and `apps/web`.

You can run them with `pnpm test:run`.

## E2E Tests

E2E tests are exclusively located in the `packages/web-tests` directory. As the name suggests, they are used to test the web application.

Before running the E2E tests, you will need 3 things:

- **Have the database running**. You can do this by running `docker-compose up -d`.
- **Have the web application running**. You can do this by running `pnpm dev`.
- **Have the Playwright browsers installed**. You can do this by running `pnpm exec playwright install`.

You can run them with `pnpm dev:test`.

## Testing Coverage

- `pnpm test:coverage` - Generate test unit coverage report
