import { useEffect, useRef } from "react"
import type { User } from "@repo/auth/server"
import { cn } from "@repo/ui/lib/utils"
import { MessageBubble } from "@/components/messages/message-bubble"
import { MessagesRecipientEmpty } from "@/components/messages/messages-recipient-empty"
import { MessagesRecipientSkeleton } from "@/components/messages/messages-recipient-skeleton"
import { useUser } from "@/stores/auth-store"
import { useMessagesStore } from "@/stores/messages-store"

type Props = {
  recipient: Pick<User, "id" | "name" | "image">
  className?: string
}

export const MessagesRecipient = ({ recipient, className }: Props) => {
  const user = useUser()
  const { messages: rawMessages } = useMessagesStore()
  const messages = rawMessages[recipient.id] ?? null
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (!messages || !user) {
    return <MessagesRecipientSkeleton />
  }

  if (messages.length === 0) {
    return <MessagesRecipientEmpty />
  }

  return (
    <div
      className={cn(
        "flex h-[calc(100%-92px)] w-full flex-col gap-2 overflow-y-auto",
        className,
      )}
    >
      {messages.map((m) => (
        <MessageBubble key={m.id} recipient={recipient} message={m} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
