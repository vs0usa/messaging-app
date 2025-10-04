# `@repo/db`

Database package providing Kysely ORM integration with PostgreSQL for type-safe database operations.

## Description

This package provides:

- Type-safe database queries using Kysely
- Database schema types
- Migrations

The package ensures type safety across all database operations, providing compile-time checks for queries and preventing common database-related errors.

## Usage

```ts
import { db } from "@repo/db"

// Type-safe queries
const users = await db
  .selectFrom("users")
  .selectAll()
  .where("email", "=", "user@example.com")
  .execute()

// Insert with type safety
await db
  .insertInto("messages")
  .values({
    content: "Hello world",
    senderId: "user-123",
    recipientId: "user-456",
  })
  .execute()
```

## Useful Commands

- `pnpm kysely` - Run Kysely CLI commands for database management
- `pnpm kysely migrate:latest` - Apply all migrations
- `pnpm kysely seed` - Seed the database with data
