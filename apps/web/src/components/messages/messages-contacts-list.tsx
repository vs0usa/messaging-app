"use client"

import { ContactsList } from "@/components/contacts/contacts-list"
import { useChat } from "@/hooks/use-chat"
import { useMessagesStore } from "@/stores/messages-store"

export const MessagesContactsList = () => {
  const { setSelectedContactId } = useMessagesStore()
  const { askMessages } = useChat()

  const handleClick = (userId: string) => {
    setSelectedContactId(userId)
    askMessages(userId)
  }

  return (
    <div className="w-full overflow-y-auto md:min-w-72 md:max-w-72">
      <ContactsList onClick={handleClick} />
    </div>
  )
}
