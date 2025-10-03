import { hc } from "hono/client"
import { env } from "@/env"
import { AppType } from "./"

export const apiClient = hc<AppType>(env.NEXT_PUBLIC_BASE_URL).api
