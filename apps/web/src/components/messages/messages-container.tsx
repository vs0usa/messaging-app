"use client"

import { useAuth } from "@/stores/auth-store"
import { MessagesBox } from "./messages-box"
import { OpenedChats } from "@/components/messages/opened-chats"

export const MessagesContainer = () => {
  const { user } = useAuth()
  // const { dynamicWidth } = useBreakpoints()

  if (!user) return null

  return (
    <div className="fixed bottom-0 w-screen z-10 px-4 md:flex flex-row-reverse gap-4 hidden">
      <MessagesBox />
      <OpenedChats />
    </div>
  )
}
