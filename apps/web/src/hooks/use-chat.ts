import { useCallback, useEffect } from "react"
import type { ClientWsMessage } from "@repo/api"
import { useUser } from "@/stores/auth-store"
import { useMessagesStore } from "@/stores/messages-store"
import { getSocket } from "@/utils/ws-client"
import {
  initialMessagesSchema,
  messageNewSchema,
  typingStartSchema,
  typingStopSchema,
  wsMessageSchema,
} from "@/utils/ws-utils"

export const useChat = () => {
  const { setMessages, setTypingRecipient, addMessage } = useMessagesStore()
  const user = useUser()

  const send = useCallback(
    <TType extends keyof ClientWsMessage>(
      type: TType,
      data: ClientWsMessage[TType],
    ) => {
      const socket = getSocket()
      socket.send(JSON.stringify({ type, payload: data }))
    },
    [],
  )

  /**
   * Utility functions to send messages to the WebSocket server
   */
  const askMessages = useCallback(
    (withRecipientId: string) => {
      console.log("Asking messages for", withRecipientId)
      send("get-initial-messages", { recipientId: withRecipientId })
    },
    [send],
  )
  const sendTypingStart = useCallback(
    (withRecipientId: string) => {
      console.log("Sending typing start for", withRecipientId)
      send("typing:start", { recipientId: withRecipientId })
    },
    [send],
  )
  const sendMessage = useCallback(
    (withRecipientId: string, content: string) => {
      console.log("Sending message for", withRecipientId)
      send("message:new", {
        recipientId: withRecipientId,
        content,
        fileUrl: null,
      })
    },
    [send],
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
  const handleMessageNew = useCallback(
    (data: unknown) => {
      const parsed = messageNewSchema.safeParse(data)

      if (!user) return
      if (!parsed.success) {
        console.error(
          "❌ Invalid message new message received from WebSocket server",
          data,
          parsed.error.issues,
        )
        return
      }

      console.log("✅ Message new message received from WebSocket server")

      const { message } = parsed.data.payload
      addMessage(
        message.senderId === user.id ? message.recipientId : message.senderId,
        message,
      )
    },
    [addMessage, user],
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
      const parsedMessage = wsMessageSchema.safeParse(data)

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
        case "message:new":
          return handleMessageNew(data)
      }

      return false
    },
    [
      handleInitialMessages,
      handleTypingStart,
      handleTypingStop,
      handleMessageNew,
    ],
  )
  const handleClose = useCallback(() => {
    console.log("❌ WebSocket closed")
  }, [])
  const handleError = useCallback(() => {
    console.log("❌ WebSocket error")
  }, [])

  useEffect(() => {
    const socket = getSocket()

    socket.onopen = handleOpen
    socket.onmessage = handleMessage
    socket.onclose = handleClose
    socket.onerror = handleError
  }, [handleClose, handleError, handleMessage, handleOpen])

  return { askMessages, sendTypingStart, sendMessage }
}
