import type { Generated, Insertable, Selectable, Updateable } from "kysely"

// Database schema types
export type Database = {
  users: UserTable
  messages: MessageTable
  attachments: AttachmentTable
}

// Users table - stores user profile information
export type UserTable = {
  id: Generated<string>
  createdAt: Generated<Date>
  updatedAt: Generated<Date>
  email: string
  name: string
  image: string | null
  emailVerified: boolean
}

// Accounts table - stores account information
export type AccountTable = {
  id: Generated<string>
  createdAt: Generated<Date>
  updatedAt: Generated<Date>
  accessToken: string | null
  refreshToken: string | null
  idToken: string | null
  accessTokenExpiresAt: Date | null
  refreshTokenExpiresAt: Date | null
  scope: string | null
  password: string | null
  accountId: string
  providerId: string
  userId: string
}

// Sessions table - stores session information
export type SessionTable = {
  id: Generated<string>
  createdAt: Generated<Date>
  updatedAt: Generated<Date>
  expiresAt: Generated<Date>
  token: string
  ipAddress: string | null
  userAgent: string | null
  userId: string
}

// Verifications table - stores verification information
export type VerificationTable = {
  id: Generated<string>
  createdAt: Generated<Date>
  updatedAt: Generated<Date>
  expiresAt: Generated<Date>
  identifier: string
  value: string
}

// Messages table - stores individual messages between two users
export type MessageTable = {
  id: Generated<string>
  createdAt: Generated<Date>
  updatedAt: Generated<Date>
  editedAt: Date | null
  readAt: Date | null
  content: string
  isEdited: Generated<boolean>
  senderId: string
  recipientId: string
}

// Attachments table - stores file attachments for messages
export type AttachmentTable = {
  id: Generated<string>
  createdAt: Generated<Date>
  fileName: string
  fileUrl: string
  fileSize: number
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
