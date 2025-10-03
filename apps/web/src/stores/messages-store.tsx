import { User } from "@repo/auth/server"
import { syncTabs } from "zustand-sync-tabs"
import { create } from "zustand"

type State = {
  contacts: Pick<User, "id" | "name" | "image">[]
  chats: string[]
  boxExpanded: boolean
  currentChat: string | null

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
      chats: [],
      boxExpanded: false,
      currentChat: null,
      setContacts: (contacts: State["contacts"]) => set(() => ({ contacts })),
      setCurrentChat: (userId: string | null) =>
        set(() => ({ currentChat: userId })),
      toggleBox: () => set((state) => ({ boxExpanded: !state.boxExpanded })),
      openChat: (userId: string) =>
        set((state) => ({
          chats: [...state.chats.filter((id) => id !== userId), userId],
        })),
      closeChat: (userId: string) =>
        set((state) => ({ chats: state.chats.filter((id) => id !== userId) })),
    }),
    { name: "messages" },
  ),
)
