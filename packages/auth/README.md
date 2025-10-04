# `@repo/auth`

Authentication package providing Better Auth integration for both client and server-side authentication.

## Description

This package provides a unified authentication system using Better Auth, offering:

- User registration and login
- Session management
- Password hashing and validation
- JWT token handling
- Database integration for user storage
- Type-safe authentication utilities

The package exports both client and server configurations, making it easy to integrate authentication across the entire application stack.

## Usage

### Client-side (React/Next.js)

```ts
import { authClient } from "@repo/auth/client"

// Sign in
await authClient.signIn.email({
  email: "user@example.com",
  password: "password",
})

// Get current session
const session = await authClient.getSession()
```

### Server-side (API)

```ts
import { headers } from "next/headers"
import { auth } from "@repo/auth/server"

// Get current session
const session = await auth.api.getSession({ headers: await headers() })

// Create a new user
await auth.api.signUpEmail({
  body: {
    name: "John Doe",
    image: null,
    email: "john.doe@example.com",
    password: "password",
  },
})
```

## Useful Commands

- `pnpm generate-migrations` - Generate database migrations for auth schema

## Migrations

Better Auth generates SQL migrations when the configuration changes and requires new fields. The workflow to apply migrations is:

1. **Generate SQL migration from Better Auth:**

   ```bash
   pnpm run -F auth generate-migrations
   ```

   This will generate an SQL file in the `better-auth_migrations/` directory.

2. **Convert SQL to Kysely migration:**

   ```bash
   pnpm -F db run kysely migrate make [name]
   ```

   This creates a new Kysely migration file. Copy the SQL content from the Better Auth generated file into the `up()` function, and create the appropriate `down()` function.

3. **Apply the migration:**

   ```bash
   pnpm -F db run kysely migrate up
   ```
