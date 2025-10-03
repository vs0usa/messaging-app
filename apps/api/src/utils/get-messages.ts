import { db } from "@repo/db"

export const getMessages = async (userId: string, recipientId: string) => {
  const rawMessages = await db
    .selectFrom("messages")
    .selectAll()
    .where((eb) =>
      eb.or([
        eb("senderId", "=", userId).and("recipientId", "=", recipientId),
        eb("senderId", "=", recipientId).and("recipientId", "=", userId),
      ]),
    )
    .orderBy("createdAt", "asc")
    .execute()
  const attachments = await db
    .selectFrom("attachments")
    .selectAll()
    .where(
      "messageId",
      "in",
      rawMessages.map((m) => m.id),
    )
    .execute()
  const messages = rawMessages.map((m) => ({
    ...m,
    attachments: attachments.filter((a) => a.messageId === m.id),
  }))

  return messages
}
