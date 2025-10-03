import type { Context } from "hono"
import type { StatusCode } from "hono/utils/http-status"
import type { UpgradeWebSocket } from "hono/ws"
import type { Database, Kysely } from "@repo/db"

type Meta = Record<string, string | number>

const ERROR_RESPONSES = {
  SOMETHING_WENT_WRONG: { code: 500, message: "Something went wrong" },
  CONFLICT: { code: 409, message: "Conflict" },
  UNAUTHORIZED: { code: 401, message: "Unauthorized" },
  FORBIDDEN: { code: 403, message: "Forbidden" },
  NOT_FOUND: { code: 404, message: "Not found" },
} satisfies Record<string, { code: StatusCode; message: string }>

export const send =
  (ctx: Context) =>
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  <TData, TMeta extends Meta = {}>(data: TData, meta: TMeta = {} as TMeta) =>
    ctx.json({
      data,
      meta,
    })

export const fail =
  (ctx: Context) =>
  (errorName: keyof typeof ERROR_RESPONSES, message?: string) =>
    ctx.json(
      {
        success: false,
        error: {
          name: errorName,
          message: message ?? ERROR_RESPONSES[errorName].message,
        },
      },
      ERROR_RESPONSES[errorName].code,
    )

declare module "hono" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ContextVariableMap {
    send: ReturnType<typeof send>
    fail: ReturnType<typeof fail>
    upgradeWebSocket: UpgradeWebSocket
    db: Kysely<Database>
  }
}
