"use client"

import { motion } from "framer-motion"
import { ChevronUpIcon } from "lucide-react"
import { Avatar } from "@repo/ui/components/avatar"
import { ContactsList } from "@/components/contacts/contacts-list"
import { useChat } from "@/hooks/use-chat"
import { useUser } from "@/stores/auth-store"
import { useMessagesStore } from "@/stores/messages-store"

export const ContactsBox = () => {
  const user = useUser()
  const { askMessages } = useChat()
  const { contactsExpanded, toggleContacts, openChat, setRecipientId } =
    useMessagesStore()

  const handleClick = (userId: string) => {
    openChat(userId)
    setRecipientId(userId)
    askMessages(userId)
  }

  if (!user) return null

  return (
    <motion.div
      className="flex w-64 flex-col"
      initial={{ height: "48px" }}
      animate={{ height: contactsExpanded ? "60vh" : "48px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        className="relative flex cursor-pointer select-none items-center"
        onClick={toggleContacts}
      >
        <div className="bg-card hover:bg-accent flex h-12 w-full items-center gap-2 rounded-t-md border border-b-0 px-2 transition-colors">
          <Avatar
            className="max-size-8"
            src={user.image}
            height={32}
            width={32}
            alt="Avatar"
          />
          <p className="font-medium">Messages</p>
        </div>
        <div className="absolute right-2 flex">
          <button
            className="hover:bg-accent rounded-full p-2 transition-[background-color,rotate] data-[expanded=true]:rotate-180"
            data-expanded={contactsExpanded}
            onClick={(e) => {
              e.stopPropagation()
              toggleContacts()
            }}
          >
            <ChevronUpIcon className="text-muted-foreground size-4" />
          </button>
        </div>
      </div>
      <div className="bg-card flex h-full flex-col overflow-y-auto border-x border-t">
        <ContactsList onClick={handleClick} />
      </div>
    </motion.div>
  )
}
