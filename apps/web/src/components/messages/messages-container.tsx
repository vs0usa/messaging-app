"use client"

import { ChatBoxesContainer } from "@/components/chat-boxes/chat-boxes-container"
import { useAuth } from "@/stores/auth-store"
import { MessagesBox } from "./messages-box"

export const MessagesContainer = () => {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="fixed bottom-0 z-10 hidden w-screen flex-row-reverse gap-4 px-4 md:flex">
      <MessagesBox />
      <ChatBoxesContainer />
    </div>
  )
}
