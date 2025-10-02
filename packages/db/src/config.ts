import { Kysely, PostgresDialect, sql } from "kysely"
import { Pool } from "pg"
import type { Database } from "./types"
import { env } from "./env"

export const dbConfig = {
  pool: new Pool({ connectionString: env.DATABASE_URL }),
}

// Create the database instance
export const db = new Kysely<Database>({
  dialect: new PostgresDialect(dbConfig),
})

// Health check function
export const checkDatabaseConnection = async () => {
  try {
    await sql`SELECT datname FROM pg_database LIMIT 1`.execute(db)
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}

// Graceful shutdown
export const closeDatabaseConnection = async () => {
  await db.destroy()
}
