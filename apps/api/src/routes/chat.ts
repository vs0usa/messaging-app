import type { WSContext } from "hono/ws"
import { Hono } from "hono"
import { authMiddleware } from "../middlewares/auth-middleware"
import { createMessage } from "../utils/create-message"
import { formatWsMessage } from "../utils/format-ws-message"
import { getMessages } from "../utils/get-messages"
import {
  getInitialMessagesSchema,
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

        ws.send(formatWsMessage("initial-messages", { recipientId, messages }))

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
          _ws.send(formatWsMessage("typing:start", { recipientId: user.id }))
        })

        setTimeout(() => {
          const oldTypingValue = currentlyTyping.get(recipientId) ?? 0
          currentlyTyping.set(recipientId, oldTypingValue - 1)

          if (oldTypingValue - 1 === 0) {
            recipientWs.forEach((_ws) => {
              _ws.send(formatWsMessage("typing:stop", { recipientId: user.id }))
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
        const recipientWs = sockets.get(recipientId)

        if (!recipientWs) {
          console.error(
            "⚠️ Recipient WebSocket not found. Can't send message new message to",
            recipientId,
          )
          return
        }

        ws.send(formatWsMessage("message:new", { message }))
        recipientWs.forEach((_ws) => {
          _ws.send(formatWsMessage("message:new", { message }))
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
