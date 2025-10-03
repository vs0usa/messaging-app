import { hc } from "hono/client"
import type { AppType } from "./"
import { env } from "@/env"

export const apiClient = hc<AppType>(env.NEXT_PUBLIC_BASE_URL).api
