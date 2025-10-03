import type { Kysely } from "kysely"

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("users")
    .addColumn("emailVerified", "boolean", (col) => col.notNull())
    .execute()

  await db.schema
    .createTable("accounts")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(db.fn("uuid_generate_v4")),
    )
    .addColumn("createdAt", "timestamptz", (col) =>
      col.notNull().defaultTo(db.fn("now")),
    )
    .addColumn("updatedAt", "timestamptz", (col) =>
      col.notNull().defaultTo(db.fn("now")),
    )
    .addColumn("accessToken", "text")
    .addColumn("refreshToken", "text")
    .addColumn("idToken", "text")
    .addColumn("accessTokenExpiresAt", "timestamptz")
    .addColumn("refreshTokenExpiresAt", "timestamptz")
    .addColumn("scope", "text")
    .addColumn("password", "text")
    .addColumn("accountId", "text", (col) => col.notNull())
    .addColumn("providerId", "text", (col) => col.notNull())
    .addColumn("userId", "uuid", (col) =>
      col.notNull().references("users.id").onDelete("cascade"),
    )
    .execute()

  await db.schema
    .createTable("sessions")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(db.fn("uuid_generate_v4")),
    )
    .addColumn("createdAt", "timestamptz", (col) =>
      col.notNull().defaultTo(db.fn("now")),
    )
    .addColumn("updatedAt", "timestamptz", (col) =>
      col.notNull().defaultTo(db.fn("now")),
    )
    .addColumn("expiresAt", "timestamptz", (col) => col.notNull())
    .addColumn("token", "text", (col) => col.notNull().unique())
    .addColumn("ipAddress", "text")
    .addColumn("userAgent", "text")
    .addColumn("userId", "uuid", (col) =>
      col.notNull().references("users.id").onDelete("cascade"),
    )
    .execute()

  await db.schema
    .createTable("verifications")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(db.fn("uuid_generate_v4")),
    )
    .addColumn("createdAt", "timestamptz", (col) =>
      col.notNull().defaultTo(db.fn("now")),
    )
    .addColumn("updatedAt", "timestamptz", (col) =>
      col.notNull().defaultTo(db.fn("now")),
    )
    .addColumn("expiresAt", "timestamptz", (col) => col.notNull())
    .addColumn("identifier", "text", (col) => col.notNull())
    .addColumn("value", "text", (col) => col.notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("verifications").execute()
  await db.schema.dropTable("sessions").execute()
  await db.schema.dropTable("accounts").execute()

  await db.schema.alterTable("users").dropColumn("emailVerified").execute()
}
