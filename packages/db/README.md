# @repo/db

Database package for the messaging app using Kysely as the query builder.

## Usage

```typescript
import { db, checkDatabaseConnection } from "@repo/db"

// Check database connection
const isConnected = await checkDatabaseConnection()

// Use the database instance
const users = await db.selectFrom("users").selectAll().execute()
```

## Development

```bash
# Install dependencies
pnpm install

# Type check
pnpm type-check

# Lint
pnpm lint
```
