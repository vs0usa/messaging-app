import type { WSContext } from "hono/ws"
import { Hono } from "hono"
import type { ServerWsMessage } from "../utils/ws-utils"
import { authMiddleware } from "../middlewares/auth-middleware"
import { createMessage } from "../utils/create-message"
import { getMessages } from "../utils/get-messages"
import {
  getInitialMessagesSchema,
  messageDeleteSchema,
  messageNewSchema,
  typingStartSchema,
  wsMessageSchema,
} from "../utils/ws-schemas"

const sockets = new Map<string, WSContext[]>()
const currentlyTyping = new Map<string, number>()

export const app = new Hono().get("/", authMiddleware, async (c) => {
  const user = c.var.user

  const handleOpen = (ws: WSContext) => {
    sockets.set(user.id, [...(sockets.get(user.id) ?? []), ws])
    console.log("✅ WebSocket opened from", user.id)
  }

  const handleClose = (ws: WSContext) => {
    sockets.set(user.id, sockets.get(user.id)?.filter((s) => s !== ws) ?? [])
    console.log("❌ WebSocket closed from", user.id)
  }

  const handleError = (ws: WSContext) => {
    sockets.set(user.id, sockets.get(user.id)?.filter((s) => s !== ws) ?? [])
    console.log("❌ WebSocket error from", user.id)
  }

  const handleMessage = async (event: MessageEvent, ws: WSContext) => {
    const data: unknown = JSON.parse(String(event.data))
    const parsedMessage = wsMessageSchema.safeParse(data)

    if (!parsedMessage.success) {
      console.error(
        "❌ Invalid message received from WebSocket client",
        user.id,
        event.data,
      )
      return
    }

    console.log("📩 WebSocket message received from", user.id)

    const send = <TType extends keyof ServerWsMessage>(
      type: TType,
      data: ServerWsMessage[TType],
      _ws: WSContext = ws,
    ) => _ws.send(JSON.stringify({ type, payload: data }))

    switch (parsedMessage.data.type) {
      case "get-initial-messages": {
        const parsed = getInitialMessagesSchema.safeParse(data)

        if (!parsed.success) {
          console.error(
            "❌ Invalid initial message received from WebSocket client",
            user.id,
            parsedMessage.data.payload,
          )
          return
        }

        console.log(
          "✅ Initial message received from WebSocket client",
          user.id,
        )

        const { recipientId } = parsed.data.payload
        const messages = await getMessages(user.id, recipientId)

        send("initial-messages", { recipientId, messages })

        break
      }

      case "typing:start": {
        const parsed = typingStartSchema.safeParse(data)

        if (!parsed.success) {
          console.error(
            "❌ Invalid typing start message received from WebSocket client",
            user.id,
            parsedMessage.data.payload,
          )
          return
        }

        console.log(
          "✅ Typing start message received from WebSocket client",
          user.id,
        )

        const { recipientId } = parsed.data.payload
        const recipientWs = sockets.get(recipientId)
        const oldTypingValue = currentlyTyping.get(recipientId) ?? 0

        if (!recipientWs) {
          console.error(
            "⚠️ Recipient WebSocket not found. Can't send typing start message to",
            recipientId,
          )
          return
        }

        currentlyTyping.set(recipientId, oldTypingValue + 1)
        recipientWs.forEach((_ws) => {
          send("typing:start", { recipientId: user.id }, _ws)
        })

        setTimeout(() => {
          const oldTypingValue = currentlyTyping.get(recipientId) ?? 0
          currentlyTyping.set(recipientId, oldTypingValue - 1)

          if (oldTypingValue - 1 === 0) {
            recipientWs.forEach((_ws) => {
              send("typing:stop", { recipientId: user.id }, _ws)
            })
          }
        }, 3000)

        break
      }

      case "message:new": {
        const parsed = messageNewSchema.safeParse(data)

        if (!parsed.success) {
          console.error(
            "❌ Invalid message new message received from WebSocket client",
            user.id,
            parsedMessage.data.payload,
          )
          return
        }

        const { recipientId, content, fileUrl } = parsed.data.payload
        const recipient = await c.var.db
          .selectFrom("users")
          .where("id", "=", recipientId)
          .selectAll()
          .executeTakeFirst()

        if (!recipient) {
          console.error(
            "⚠️ Recipient not found. Can't send message new message to",
            recipientId,
          )
          return
        }

        const rawMessage = await createMessage(
          user.id,
          recipientId,
          content,
          fileUrl,
        )

        if (!rawMessage) {
          console.error(
            "❌ Failed to create message",
            user.id,
            recipientId,
            content,
            fileUrl,
          )
          return
        }

        const message = { ...rawMessage, attachments: [] }
        const sender = { id: user.id, name: user.name, image: user.image }
        const recipientWs = sockets.get(recipientId)

        send("message:new", { message, recipient, sender })

        if (!recipientWs) {
          console.error(
            "⚠️ Recipient WebSocket not found. Can't send message new message to",
            recipientId,
          )
          return
        }

        recipientWs.forEach((_ws) => {
          send("message:new", { message, recipient, sender }, _ws)
          send("typing:stop", { recipientId: user.id }, _ws)
        })

        break
      }

      case "message:delete": {
        const parsed = messageDeleteSchema.safeParse(data)

        if (!parsed.success) {
          console.error(
            "❌ Invalid message delete message received from WebSocket client",
            user.id,
            parsedMessage.data.payload,
          )
          return
        }

        const { id } = parsed.data.payload
        const message = await c.var.db
          .selectFrom("messages")
          .where("id", "=", id)
          .selectAll()
          .executeTakeFirst()

        if (!message || message.senderId !== user.id) {
          return
        }

        const recipientWs = sockets.get(message.recipientId)

        send("message:delete", { id })

        await c.var.db.deleteFrom("messages").where("id", "=", id).execute()

        if (!recipientWs) {
          console.error(
            "⚠️ Recipient WebSocket not found. Can't send message delete message to",
            message.recipientId,
          )
          return
        }

        recipientWs.forEach((_ws) => {
          send("message:delete", { id }, _ws)
        })

        break
      }
    }
  }

  return c.var.upgradeWebSocket(c, {
    onOpen: (_, ws) => void handleOpen(ws),
    onClose: (_, ws) => void handleClose(ws),
    onError: (_, ws) => void handleError(ws),
    onMessage: (event, ws) => void handleMessage(event, ws),
  })
})
