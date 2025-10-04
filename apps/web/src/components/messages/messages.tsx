"use client"

import { MessagesEmpty } from "@/components/messages/messages-empty"
import { MessagesInput } from "@/components/messages/messages-input"
import { MessagesRecipient } from "@/components/messages/messages-recipient"
import { MessagesRecipientSheet } from "@/components/messages/messages-recipient-sheet"
import { useMessagesStore } from "@/stores/messages-store"

export const Messages = () => {
  const { selectedContactId } = useMessagesStore()
  const { contacts } = useMessagesStore()
  const recipient = contacts.find((c) => c.id === selectedContactId)

  if (!recipient) return <MessagesEmpty />

  return (
    <div className="hidden w-full md:block">
      <MessagesRecipientSheet />
      <MessagesRecipient recipient={recipient} />
      <MessagesInput recipientId={recipient.id} />
    </div>
  )
}
