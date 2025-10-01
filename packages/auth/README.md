# `@repo/auth`

Auth package for the messaging app.

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
