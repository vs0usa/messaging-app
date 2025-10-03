import type { InferResponseType } from "hono"
import type { ClientResponse } from "hono/client"
import { hc } from "hono/client"
import type { AppType } from "@repo/api"
import { env } from "@/env"
import { ApiError, errorSchema } from "@/utils/api-error"

type Fn = (...args: never[]) => Promise<ClientResponse<unknown, number, "json">>

export const apiClient = hc<AppType>(env.NEXT_PUBLIC_BASE_API_URL).api

export const call =
  <TReq extends Fn>(req: TReq, options?: Parameters<TReq>[0]) =>
  async () => {
    const response = await req(options as never)

    if (response.ok) {
      return (await response.json()) as InferResponseType<TReq>
    }

    try {
      const error: unknown = await response.json()
      const parsedError = errorSchema.parse(error)

      throw new ApiError(
        parsedError.error.message,
        response.status,
        parsedError.error.name,
      )
    } catch (e) {
      console.error(e)
      throw new ApiError("Unknown error", response.status, "unknown_error")
    }
  }
