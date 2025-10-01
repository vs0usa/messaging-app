import { config } from "@repo/config"
import { dbConfig } from "@repo/db"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
  database: dbConfig.pool,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: config.auth.password.minLength,
    maxPasswordLength: config.auth.password.maxLength,
  },

  // Use plural names for the tables
  user: { modelName: "users" },
  account: { modelName: "accounts" },
  session: { modelName: "sessions" },
  verification: { modelName: "verifications" },
})
