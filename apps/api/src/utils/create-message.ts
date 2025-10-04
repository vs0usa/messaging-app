import { db } from "@repo/db"

export const createMessage = async (
  userId: string,
  recipientId: string,
  content: string,
  _: string | null,
) => {
  const message = await db
    .insertInto("messages")
    .values({
      senderId: userId,
      recipientId,
      content,
    })
    .returningAll()
    .execute()

  return message[0]
}
