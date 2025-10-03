import { create } from "zustand"
import { syncTabs } from "zustand-sync-tabs"
import type { ChatMessage } from "@repo/api"
import type { User } from "@repo/auth/server"

type State = {
  ws: WebSocket | null
  contacts: Pick<User, "id" | "name" | "image">[]
  openChats: string[] // User IDs
  contactsExpanded: boolean
  recipientId: string | null
  messages: Record<string, ChatMessage[]>
  typingRecipients: string[]

  setWs: (ws: WebSocket | null) => void
  setContacts: (contacts: Pick<User, "id" | "name" | "image">[]) => void
  setRecipientId: (userId: string | null) => void
  toggleContacts: () => void
  openChat: (userId: string) => void
  closeChat: (userId: string) => void
  setMessages: (recipientId: string, messages: ChatMessage[]) => void
  addMessage: (recipientId: string, message: ChatMessage) => void
  setTypingRecipient: (recipientId: string, isTyping: boolean) => void
}

export const useMessagesStore = create<State>(
  syncTabs(
    (set) => ({
      ws: null,
      contacts: [],
      openChats: [],
      contactsExpanded: false,
      recipientId: null,
      messages: {},
      typingRecipients: [],
      setWs: (ws: WebSocket | null) => set(() => ({ ws })),
      setContacts: (contacts: State["contacts"]) => set(() => ({ contacts })),
      setRecipientId: (userId: string | null) =>
        set(() => ({ recipientId: userId })),
      toggleContacts: () =>
        set((state) => ({ contactsExpanded: !state.contactsExpanded })),
      openChat: (userId: string) =>
        set((state) => ({
          openChats: [...state.openChats.filter((id) => id !== userId), userId],
        })),
      closeChat: (userId: string) =>
        set((state) => ({
          openChats: state.openChats.filter((id) => id !== userId),
        })),
      setMessages: (recipientId: string, messages: ChatMessage[]) =>
        set((state) => ({
          messages: { ...state.messages, [recipientId]: messages },
        })),
      addMessage: (recipientId: string, message: ChatMessage) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [recipientId]: [...(state.messages[recipientId] ?? []), message],
          },
        })),
      setTypingRecipient: (recipientId: string, isTyping: boolean) =>
        set((state) => ({
          typingRecipients: isTyping
            ? [...state.typingRecipients, recipientId]
            : state.typingRecipients.filter((id) => id !== recipientId),
        })),
    }),
    { name: "messages", exclude: ["ws"] },
  ),
)
