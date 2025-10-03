import type { WSContext } from "hono/ws"
import { Hono } from "hono"
import { authMiddleware } from "../middlewares/auth-middleware"
import { formatWsMessage } from "../utils/format-ws-message"
import { getMessages } from "../utils/get-messages"
import { getInitialMessagesSchema, messageSchema } from "../utils/ws-schemas"

export const app = new Hono().get("/", authMiddleware, async (c) => {
  const user = c.var.user

  const handleOpen = (_: WSContext) => {
    console.log("WebSocket opened from", user.id)
  }

  const handleClose = (_: WSContext) => {
    console.log("WebSocket closed from", user.id)
  }

  const handleError = (_: WSContext) => {
    console.log("WebSocket error from", user.id)
  }

  const handleMessage = async (event: MessageEvent, ws: WSContext) => {
    const data: unknown = JSON.parse(String(event.data))
    const parsedMessage = messageSchema.safeParse(data)

    if (!parsedMessage.success) {
      console.error(
        "❌ Invalid message received from WebSocket client",
        user.id,
        event.data,
      )
      return
    }

    console.log("📩 WebSocket message received from", user.id)
    console.log("Parsed message", parsedMessage.data)

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
    }
  }

  return c.var.upgradeWebSocket(c, {
    onOpen: (_, ws) => void handleOpen(ws),
    onClose: (_, ws) => void handleClose(ws),
    onError: (_, ws) => void handleError(ws),
    onMessage: (event, ws) => void handleMessage(event, ws),
  })
})
