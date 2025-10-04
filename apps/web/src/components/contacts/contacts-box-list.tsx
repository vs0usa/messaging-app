import { useEffect, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Avatar } from "@repo/ui/components/avatar"
import { Skeleton } from "@repo/ui/components/skeleton"
import { useChat } from "@/hooks/use-chat"
import { useMessagesStore } from "@/stores/messages-store"
import { apiClient, call } from "@/utils/call"
import { formatMessageDate } from "@/utils/date-format"

export const ContactsBoxList = () => {
  const { setContacts, openChat, setRecipientId, messages } = useMessagesStore()
  const { askMessages } = useChat()
  const { data: users, isPending } = useQuery({
    queryKey: ["get-contacts"],
    queryFn: call(apiClient.contacts.$get),
  })
  const sortedUsers = useMemo(
    () =>
      users?.data.sort(
        (a, b) =>
          new Date(b.lastMessageAt).getTime() -
          new Date(a.lastMessageAt).getTime(),
      ),
    [users],
  )

  const getLatestMessage = (userId: string, defaultMessage: string) => {
    return messages[userId]?.at(-1)?.content ?? defaultMessage
  }

  // Set contacts when users are fetched
  useEffect(() => {
    if (users) {
      setContacts(
        users.data.map((u) => ({ id: u.id, name: u.name, image: u.image })),
      )
    }
  }, [setContacts, users])

  if (isPending || !sortedUsers) {
    return (
      <div className="bg-card flex h-full flex-col overflow-y-auto border-x border-t">
        <Skeleton className="h-12 rounded" />
        <Skeleton className="h-12 rounded" />
        <Skeleton className="h-12 rounded" />
        <Skeleton className="h-12 rounded" />
      </div>
    )
  }

  return (
    <div className="bg-card flex h-full flex-col overflow-y-auto border-x border-t">
      {sortedUsers.map((u) => (
        <button
          key={u.id}
          className="hover:bg-accent flex cursor-pointer items-center gap-2 p-2 text-start transition-colors"
          onClick={() => {
            openChat(u.id)
            setRecipientId(u.id)
            askMessages(u.id)
          }}
        >
          <Avatar
            className="max-size-10"
            src={u.image}
            height={40}
            width={40}
            alt={u.name}
          />
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-1">
              <p className="line-clamp-1 text-sm font-medium">{u.name}</p>
              <div className="text-muted-foreground min-w-fit text-xs">
                {formatMessageDate(u.lastMessageAt)}
              </div>
            </div>
            <p className="text-muted-foreground line-clamp-2 text-xs">
              {getLatestMessage(u.id, u.lastMessage)}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}
