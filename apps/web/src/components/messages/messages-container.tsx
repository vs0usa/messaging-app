"use client"

import { OpenedChats } from "@/components/messages/opened-chats"
import { useAuth } from "@/stores/auth-store"
import { MessagesBox } from "./messages-box"

export const MessagesContainer = () => {
  const { user } = useAuth()
  // const { dynamicWidth } = useBreakpoints()

  if (!user) return null

  return (
    <div className="fixed bottom-0 z-10 hidden w-screen flex-row-reverse gap-4 px-4 md:flex">
      <MessagesBox />
      <OpenedChats />
    </div>
  )
}
