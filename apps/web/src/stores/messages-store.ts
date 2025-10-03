import { create } from "zustand"
import { syncTabs } from "zustand-sync-tabs"
import type { User } from "@repo/auth/server"

type State = {
  contacts: Pick<User, "id" | "name" | "image">[]
  openChats: string[] // User IDs
  boxExpanded: boolean
  currentChat: string | null

  setWs: (ws: WebSocket | null) => void
  setContacts: (contacts: Pick<User, "id" | "name" | "image">[]) => void
  setCurrentChat: (userId: string | null) => void
  toggleBox: () => void
  openChat: (userId: string) => void
  closeChat: (userId: string) => void
}

export const useMessagesStore = create<State>(
  syncTabs(
    (set) => ({
      contacts: [],
      openChats: [],
      boxExpanded: false,
      currentChat: null,
      setWs: (ws: WebSocket | null) => set(() => ({ ws })),
      setContacts: (contacts: State["contacts"]) => set(() => ({ contacts })),
      setCurrentChat: (userId: string | null) =>
        set(() => ({ currentChat: userId })),
      toggleBox: () => set((state) => ({ boxExpanded: !state.boxExpanded })),
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
