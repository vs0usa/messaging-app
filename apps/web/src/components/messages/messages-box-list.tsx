import { Skeleton } from "@repo/ui/components/skeleton"
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/api/client"
import { call } from "@/utils/call"
import { Avatar } from "@repo/ui/components/avatar"
import { formatMessageDate } from "@/utils/date-format"
import { useMessagesStore } from "@/stores/messages-store"
import { useEffect } from "react"

export const MessagesBoxList = () => {
  const { setContacts, openChat, setCurrentChat } = useMessagesStore()
  const { data: users, isPending } = useQuery({
    queryKey: ["get-contacts"],
    queryFn: call(apiClient.contacts.$get),
  })

  // Set contacts when users are fetched
  useEffect(() => {
    if (users) {
      setContacts(
        users.data.map((u) => ({ id: u.id, name: u.name, image: u.image })),
      )
    }
  }, [setContacts, users])

  return (
    <div className="bg-popover flex h-full flex-col overflow-y-auto border-x border-t">
      {isPending && (
        <>
          <Skeleton className="h-12 rounded" />
          <Skeleton className="h-12 rounded" />
          <Skeleton className="h-12 rounded" />
          <Skeleton className="h-12 rounded" />
        </>
      )}
      {users &&
        users.data.map((u) => (
          <button
            key={u.id}
            className="hover:bg-accent flex cursor-pointer items-center gap-2 p-2 text-start transition-colors"
            onClick={() => {
              openChat(u.id)
              setCurrentChat(u.id)
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
                <div className="text-muted-foreground text-xs">
                  {formatMessageDate(u.lastMessageAt)}
                </div>
              </div>
              <p className="text-muted-foreground line-clamp-2 text-xs">
                {u.lastMessage || "No messages yet"}
              </p>
            </div>
          </button>
        ))}
    </div>
  )
}
