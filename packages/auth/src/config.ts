import { dbConfig } from "@repo/db"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
  database: dbConfig.pool,

  // Use plural names for the tables
  user: { modelName: "users" },
  account: { modelName: "accounts" },
  session: { modelName: "sessions" },
  verification: { modelName: "verifications" },
})
