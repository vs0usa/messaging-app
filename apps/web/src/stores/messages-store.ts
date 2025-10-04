import { create } from "zustand"
import { syncTabs } from "zustand-sync-tabs"
import type { ChatMessage } from "@repo/api"
import type { User } from "@repo/auth/server"

type State = {
  contacts: Pick<User, "id" | "name" | "image">[]
  openChats: string[] // User IDs
  contactsExpanded: boolean
  recipientId: string | null // floating box recipient id
  selectedContactId: string | null // messages page selected contact id
  messages: Record<string, ChatMessage[]>
  typingRecipients: string[]

  setContacts: (contacts: Pick<User, "id" | "name" | "image">[]) => void
  setRecipientId: (userId: string | null) => void
  toggleContacts: () => void
  openChat: (userId: string) => void
  closeChat: (userId: string) => void
  setSelectedContactId: (userId: string | null) => void
  setMessages: (recipientId: string, messages: ChatMessage[]) => void
  addMessage: (recipientId: string, message: ChatMessage) => void
  delMessage: (id: string) => void
  setTypingRecipient: (recipientId: string, isTyping: boolean) => void
}

export const useMessagesStore = create<State>(
  syncTabs(
    (set) => ({
      contacts: [],
      openChats: [],
      contactsExpanded: false,
      recipientId: null,
      selectedContactId: null,
      messages: {},
      typingRecipients: [],
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
      setSelectedContactId: (userId: string | null) =>
        set(() => ({ selectedContactId: userId })),
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
      delMessage: (id: string) =>
        set((state) => {
          const recipientId = Object.keys(state.messages).find((key) =>
            (state.messages[key] ?? []).some((m) => m.id === id),
          )

          if (!recipientId) return state

          return {
            messages: {
              ...state.messages,
              [recipientId]: (state.messages[recipientId] ?? []).filter(
                (m) => m.id !== id,
              ),
            },
          }
        }),
      setTypingRecipient: (recipientId: string, isTyping: boolean) =>
        set((state) => ({
          typingRecipients: isTyping
            ? [...state.typingRecipients, recipientId]
            : state.typingRecipients.filter((id) => id !== recipientId),
        })),
    }),
    { name: "messages" },
  ),
)
