import { createEnv } from "@t3-oss/env-nextjs"
import { authEnv } from "@repo/auth/env"
import z from "zod"

export const env = createEnv({
  extends: [authEnv],

  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_BASE_URL: z.url(),
  },

  /**
   * Destructure all client-side variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
})
