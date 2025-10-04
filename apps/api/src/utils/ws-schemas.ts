import { z } from "zod/v4"

export const wsMessageSchema = z.object({
  type: z.enum([
    "get-initial-messages",
    "typing:start",
    "typing:stop",
    "message:new",
    "message:delete",
    "message:read",
  ]),
  payload: z.object(),
})

export const getInitialMessagesSchema = z.object({
  type: z.literal("get-initial-messages"),
  payload: z.object({ recipientId: z.string() }),
})

export const typingStartSchema = z.object({
  type: z.literal("typing:start"),
  payload: z.object({ recipientId: z.string() }),
})

export const messageNewSchema = z.object({
  type: z.literal("message:new"),
  payload: z.object({
    recipientId: z.string(),
    content: z.string(),
    fileUrl: z.string().nullable(),
  }),
})

export const messageDeleteSchema = z.object({
  type: z.literal("message:delete"),
  payload: z.object({ id: z.string() }),
})
