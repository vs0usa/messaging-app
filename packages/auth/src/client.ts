import { createAuthClient } from "better-auth/client"
import { authEnv } from "./env"

export const authClient = createAuthClient({
  baseURL: authEnv.NEXT_PUBLIC_API_BASE_URL,
})
