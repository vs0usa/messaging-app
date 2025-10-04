import type { Attachment, Message } from "@repo/db"

export type ChatMessage = Message & { attachments: Attachment[] }

// Messages the server sends
export type ServerWsMessage = {
  "initial-messages": { recipientId: string; messages: ChatMessage[] }
  "typing:start": { recipientId: string }
  "typing:stop": { recipientId: string }
  "message:new": { message: ChatMessage }
  "message:delete": { id: string }
  "message:read": { id: string }
}

// Messages the client sends
export type ClientWsMessage = {
  "get-initial-messages": { recipientId: string }
  "typing:start": { recipientId: string }
  "message:new": {
    recipientId: string
    content: string
    fileUrl: string | null
  }
  "message:delete": { id: string }
  "message:read": { id: string }
}
