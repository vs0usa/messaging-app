import { z } from "zod/v4"

export const wsMessageSchema = z.object({
  type: z.enum([
    "initial-messages",
    "typing:start",
    "typing:stop",
    "message:new",
    "message:delete",
    "message:read",
  ]),
  payload: z.object(),
})

const messageSchema = z.object({
  id: z.uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  editedAt: z.coerce.date().nullable(),
  readAt: z.coerce.date().nullable(),
  content: z.string(),
  isEdited: z.boolean(),
  senderId: z.uuid(),
  recipientId: z.uuid(),
  attachments: z
    .object({
      id: z.uuid(),
      createdAt: z.coerce.date(),
      fileName: z.string(),
      fileUrl: z.string(),
      fileSize: z.number(),
      mimeType: z.string(),
      messageId: z.uuid(),
    })
    .array(),
})

export const initialMessagesSchema = z.object({
  type: z.literal("initial-messages"),
  payload: z.object({
    recipientId: z.uuid(),
    messages: messageSchema.array(),
  }),
})

export const typingStartSchema = z.object({
  type: z.literal("typing:start"),
  payload: z.object({ recipientId: z.uuid() }),
})

export const typingStopSchema = z.object({
  type: z.literal("typing:stop"),
  payload: z.object({ recipientId: z.uuid() }),
})

export const messageNewSchema = z.object({
  type: z.literal("message:new"),
  payload: z.object({ message: messageSchema }),
})

export const messageDeleteSchema = z.object({
  type: z.literal("message:delete"),
  payload: z.object({ id: z.uuid() }),
})

export const messageReadSchema = z.object({
  type: z.literal("message:read"),
  payload: z.object({ id: z.uuid() }),
})
