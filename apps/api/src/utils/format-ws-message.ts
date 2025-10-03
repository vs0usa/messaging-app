import type { Attachment, Message } from "@repo/db"

export type ChatMessage = Message & { attachments: Attachment[] }

// Messages the server sends
export type ServerWsMessage = {
  "initial-messages": { recipientId: string; messages: ChatMessage[] }
  "typing:start": { userId: string }
  "typing:stop": { userId: string }
  "message:new": Message & { attachments: Attachment[] }
  "message:delete": { id: string }
  "message:read": { id: string }
}

export const formatWsMessage = <TType extends keyof ServerWsMessage>(
  type: TType,
  data: ServerWsMessage[TType],
) => JSON.stringify({ type, payload: data })

// Messages the client sends
export type ClientWsMessage = {
  "get-initial-messages": { recipientId: string }
  "typing:start": { recipientId: string }
  "typing:stop": { recipientId: string }
  "message:new": {
    recipientId: string
    content: string
    fileUrl: string | null
  }
  "message:delete": { id: string }
  "message:read": { id: string }
}
