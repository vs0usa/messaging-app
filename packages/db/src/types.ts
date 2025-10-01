import type { Generated, Insertable, Selectable, Updateable } from "kysely"

// Database schema types
export interface Database {
  users: UserTable
  messages: MessageTable
  attachments: AttachmentTable
}

// Users table - stores user profile information
export interface UserTable {
  id: Generated<string> // UUID
  createdAt: Generated<Date>
  updatedAt: Generated<Date>

  email: string
  firstName: string
  lastName: string
  profilePictureUrl: string | null
  isActive: Generated<boolean>
}

// Messages table - stores individual messages between two users
export interface MessageTable {
  id: Generated<string> // UUID
  createdAt: Generated<Date>
  updatedAt: Generated<Date>
  editedAt: Date | null
  readAt: Date | null // When the message was read by the recipient

  content: string
  replyToMessageId: string | null // For threaded conversations
  isEdited: Generated<boolean>

  senderId: string
  recipientId: string
}

// Attachments table - stores file attachments for messages
export interface AttachmentTable {
  id: Generated<string> // UUID
  createdAt: Generated<Date>

  fileName: string
  fileUrl: string
  fileSize: number // Size in bytes
  mimeType: string

  messageId: string
}

// Type helpers for easier usage
export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>

export type Message = Selectable<MessageTable>
export type NewMessage = Insertable<MessageTable>
export type MessageUpdate = Updateable<MessageTable>

export type Attachment = Selectable<AttachmentTable>
export type NewAttachment = Insertable<AttachmentTable>
export type AttachmentUpdate = Updateable<AttachmentTable>
