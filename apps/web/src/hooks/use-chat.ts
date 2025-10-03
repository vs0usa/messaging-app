import { useCallback, useEffect } from "react"
import { useMessagesStore } from "@/stores/messages-store"
import { apiClient } from "@/utils/call"
import {
  formatWsMessage,
  initialMessagesSchema,
  messageSchema,
  typingStartSchema,
  typingStopSchema,
} from "@/utils/ws-utils"

export const useChat = () => {
  const { ws, setWs, setMessages, setTypingRecipient } = useMessagesStore()
  // const wsRef = useRef<WebSocket | null>(null)

  /**
   * Utility functions to send messages to the WebSocket server
   */
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
  const sendTypingStart = useCallback(
    (withRecipientId: string) => {
      console.log("Sending typing start for", withRecipientId)

      ws?.send(
        formatWsMessage("typing:start", { recipientId: withRecipientId }),
      )
    },
    [ws],
  )

  /**
   * Message handlers
   * Every received message needs to be parsed and handled accordingly
   */
  const handleInitialMessages = useCallback(
    (data: unknown) => {
      const parsed = initialMessagesSchema.safeParse(data)

      if (!parsed.success) {
        console.error(
          "❌ Invalid initial message received from WebSocket server",
          data,
          parsed.error.issues,
        )
        return
      }

      console.log("✅ Initial message received from WebSocket server")

      const { recipientId, messages } = parsed.data.payload
      setMessages(recipientId, messages)
    },
    [setMessages],
  )
  const handleTypingStart = useCallback(
    (data: unknown) => {
      const parsed = typingStartSchema.safeParse(data)

      if (!parsed.success) {
        console.error(
          "❌ Invalid typing start message received from WebSocket server",
          data,
          parsed.error.issues,
        )
        return
      }

      console.log("✅ Typing start message received from WebSocket server")

      const { recipientId } = parsed.data.payload
      setTypingRecipient(recipientId, true)
    },
    [setTypingRecipient],
  )
  const handleTypingStop = useCallback(
    (data: unknown) => {
      const parsed = typingStopSchema.safeParse(data)

      if (!parsed.success) {
        console.error(
          "❌ Invalid typing stop message received from WebSocket server",
          data,
          parsed.error.issues,
        )
        return
      }

      console.log("✅ Typing stop message received from WebSocket server")

      const { recipientId } = parsed.data.payload
      setTypingRecipient(recipientId, false)
    },
    [setTypingRecipient],
  )

  /**
   * WebSocket event handlers
   */
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
        case "initial-messages":
          return handleInitialMessages(data)
        case "typing:start":
          return handleTypingStart(data)
        case "typing:stop":
          return handleTypingStop(data)
      }
    },
    [handleInitialMessages, handleTypingStart, handleTypingStop],
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

  return { askMessages, sendTypingStart }
}
