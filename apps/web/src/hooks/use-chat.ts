import { useCallback, useEffect } from "react"
import { useMessagesStore } from "@/stores/messages-store"
import { apiClient } from "@/utils/call"
import {
  formatWsMessage,
  initialMessagesSchema,
  messageSchema,
} from "@/utils/ws-utils"

export const useChat = () => {
  const { ws, setWs, setMessages } = useMessagesStore()
  // const wsRef = useRef<WebSocket | null>(null)

  const askMessages = useCallback(
    (withRecipientId: string) => {
      console.log("Asking messages for", withRecipientId)
      console.log("WebSocket", ws)

      ws?.send(
        formatWsMessage("get-initial-messages", {
          recipientId: withRecipientId,
        }),
      )
    },
    [ws],
  )

  const handleOpen = useCallback(() => {
    console.log("✅ WebSocket opened")
  }, [])
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const data: unknown = JSON.parse(String(event.data))
      const parsedMessage = messageSchema.safeParse(data)

      if (!parsedMessage.success) {
        console.error(
          "❌ Invalid message received from WebSocket server",
          event.data,
        )
        return
      }

      switch (parsedMessage.data.type) {
        case "initial-messages": {
          const parsed = initialMessagesSchema.safeParse(data)

          if (!parsed.success) {
            console.error(
              "❌ Invalid initial message received from WebSocket server",
              parsedMessage.data.payload,
              parsed.error.issues,
            )
            return
          }

          console.log("✅ Initial message received from WebSocket server")
          console.log("Parsed message", parsed.data)

          const { recipientId, messages } = parsed.data.payload
          setMessages(recipientId, messages)

          break
        }
      }
    },
    [setMessages],
  )

  const handleClose = useCallback(() => {
    console.log("❌ WebSocket closed")
  }, [])
  const handleError = useCallback(() => {
    console.log("❌ WebSocket error")
  }, [])

  useEffect(() => {
    const newWs = apiClient.chat.$ws()

    newWs.onopen = handleOpen
    newWs.onmessage = handleMessage
    newWs.onclose = handleClose
    newWs.onerror = handleError
    setWs(newWs)

    return () => {
      newWs.close()
      setWs(null)
    }
  }, [handleClose, handleError, handleMessage, handleOpen, setWs])

  return { askMessages }
}
