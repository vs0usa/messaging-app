import { create } from "zustand"
import { syncTabs } from "zustand-sync-tabs"
import type { User } from "@repo/auth/server"

type State = {
  contacts: Pick<User, "id" | "name" | "image">[]
  openChats: string[] // User IDs
  contactsExpanded: boolean
  recipientId: string | null

  setWs: (ws: WebSocket | null) => void
  setContacts: (contacts: Pick<User, "id" | "name" | "image">[]) => void
  setRecipientId: (userId: string | null) => void
  toggleContacts: () => void
  openChat: (userId: string) => void
  closeChat: (userId: string) => void
}

export const useMessagesStore = create<State>(
  syncTabs(
    (set) => ({
      contacts: [],
      openChats: [],
      contactsExpanded: false,
      recipientId: null,
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
    }),
    { name: "messages" },
  ),
)
