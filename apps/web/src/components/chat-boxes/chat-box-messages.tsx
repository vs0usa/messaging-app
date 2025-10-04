import { useEffect, useRef } from "react"
import { Avatar } from "@repo/ui/components/avatar"
import { Skeleton } from "@repo/ui/components/skeleton"
import { useUser } from "@/stores/auth-store"
import { useMessagesStore } from "@/stores/messages-store"
import { formatMessageDate } from "@/utils/date-format"

type Props = {
  id: string
}

export const ChatBoxMessages = ({ id }: Props) => {
  const user = useUser()
  const { contacts, messages: rawMessages } = useMessagesStore()
  const messages = rawMessages[id] ?? null
  const recipient = contacts.find((c) => c.id === id)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (!messages || !recipient || !user) {
    return (
      <div className="h-[calc(100%-140px)] space-y-4 overflow-y-auto p-4">
        <Skeleton className="min-h-12 rounded" />
        <Skeleton className="min-h-12 rounded" />
        <Skeleton className="min-h-12 rounded" />
        <Skeleton className="min-h-12 rounded" />
        <Skeleton className="min-h-12 rounded" />
        <Skeleton className="min-h-12 rounded" />
        <Skeleton className="min-h-12 rounded" />
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="h-[calc(100%-140px)] space-y-4 overflow-y-auto p-4">
        <p className="text-muted-foreground text-center">No messages yet</p>
      </div>
    )
  }

  return (
    <div className="h-[calc(100%-140px)] space-y-4 overflow-y-auto p-4">
      {messages.map((m) => {
        const messageUser = m.senderId === id ? recipient : user

        return (
          <div key={m.id} className="flex items-center gap-2">
            <Avatar
              src={messageUser.image}
              className="max-size-10 place-self-start self-start"
              classNames={{ base: "place-self-start pt-1" }}
              height={40}
              width={40}
              alt={messageUser.name}
            />
            <div>
              <div className="flex items-center gap-1">
                <p className="line-clamp-1 font-medium">{messageUser.name}</p>
                <p className="text-muted-foreground min-w-fit select-none text-xs">
                  • {formatMessageDate(m.createdAt)}
                </p>
              </div>
              <p className="text-foreground/80 text-sm">{m.content}</p>
            </div>
          </div>
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}
