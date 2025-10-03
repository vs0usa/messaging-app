import { Hono } from "hono"
import { authMiddleware } from "../middlewares/auth-middleware"

export const app = new Hono().get(
  "/:id",
  authMiddleware,
  async ({ req, var: { db, user, send } }) => {
    const id = req.param("id")
    const messages = await db
      .selectFrom("messages")
      .select([
        "id",
        "createdAt",
        "content",
        "senderId",
        "recipientId",
        "isEdited",
        "readAt",
      ])
      .where((eb) =>
        eb.or([
          eb("senderId", "=", user.id).or("recipientId", "=", user.id),
          eb("senderId", "=", id).or("recipientId", "=", id),
        ]),
      )
      .orderBy("createdAt", "asc")
      .execute()
    const attachments = await db
      .selectFrom("attachments")
      .select(["id", "fileName", "fileUrl", "fileSize", "mimeType"])
      .where(
        "messageId",
        "in",
        messages.map((m) => m.id),
      )
      .execute()

    return send({ messages, attachments }, { total: messages.length })
  },
)
