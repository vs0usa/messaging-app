import { InferResponseType } from "hono"
import { ApiError, errorSchema } from "@/utils/api-error"

export const call =
  <TReq extends (...args: never[]) => Promise<Response>>(req: TReq) =>
  async () => {
    const response = await req()

    if (response.ok) {
      return (await response.json()) as InferResponseType<TReq>
    }

    try {
      const error = await response.json()
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
