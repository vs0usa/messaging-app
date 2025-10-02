import { Database, Kysely } from "@repo/db"
import { Context } from "hono"

type Meta = Record<string, string | number>

export const send =
  (ctx: Context) =>
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  <TData, TMeta extends Meta = {}>(data: TData, meta: TMeta = {} as TMeta) =>
    ctx.json({
      data,
      meta,
    })

export const fail = (ctx: Context) => (errorName: string, message?: string) =>
  ctx.json({
    success: false,
    error: {
      name: errorName,
      message: message || "Unknown error",
    },
  })

declare module "hono" {
  interface ContextVariableMap {
    send: ReturnType<typeof send>
    fail: ReturnType<typeof fail>
    db: Kysely<Database>
  }
}
