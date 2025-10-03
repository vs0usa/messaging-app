import { betterAuth } from "better-auth"
import { config } from "@repo/config"
import { dbConfig } from "@repo/db"

export const auth = betterAuth({
  database: dbConfig.pool,
  trustedOrigins: [config.web.baseUrl],
  emailAndPassword: {
    enabled: true,
    //Email verification is not implemented yet, so we can auto sign in the user
    autoSignIn: true,
    minPasswordLength: config.auth.password.minLength,
    maxPasswordLength: config.auth.password.maxLength,
  },
  advanced: { database: { generateId: false } },

  // Use plural names for the tables
  user: { modelName: "users" },
  account: { modelName: "accounts" },
  session: { modelName: "sessions" },
  verification: { modelName: "verifications" },
})

export type User = (typeof auth.$Infer.Session)["user"]
export type Session = typeof auth.$Infer.Session
