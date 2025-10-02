import { createEnv } from "@t3-oss/env-nextjs"
import { authEnv } from "@repo/auth/env"
import { dbEnv } from "@repo/db/env"

export const env = createEnv({
  extends: [dbEnv, authEnv],

  /**
   * Destructure all client-side variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {},
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
})
