import { Hono } from "hono"
import { sql } from "kysely"
import type { User } from "@repo/auth/server"
import { authMiddleware } from "../middlewares/auth-middleware"

export const app = new Hono().get(
  "/",
  authMiddleware,
  async ({ var: { user, db, send } }) => {
    const conversations = (await db
      .selectFrom("messages as m")
      .innerJoin("users as u", (join) =>
        join.on(
          sql`u.id = case 
          when m."senderId" = ${user.id} then m."recipientId"
          else m."senderId"
        end`,
        ),
      )
      .select([
        "u.id",
        "u.name",
        "u.image",
        sql`m.content`.as("lastMessage"),
        sql`m."createdAt"`.as("lastMessageAt"),
      ])
      .where((eb) =>
        eb("m.senderId", "=", user.id).or("m.recipientId", "=", user.id),
      )
      .where("u.id", "!=", user.id)
      .distinctOn([
        sql`least(m."senderId", m."recipientId")`,
        sql`greatest(m."senderId", m."recipientId")`,
      ])
      .orderBy([
        sql`least(m."senderId", m."recipientId")`,
        sql`greatest(m."senderId", m."recipientId")`,
        sql`m."createdAt" desc`,
      ])
      .execute()) as (Pick<User, "id" | "name" | "image"> & {
      lastMessage: string
      lastMessageAt: Date
    })[]

    return send(conversations)
  },
)
