import { Skeleton } from "@repo/ui/components/skeleton"
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/api/client"
import { call } from "@/utils/call"
import { Avatar } from "@repo/ui/components/avatar"
import { formatMessageDate } from "@/utils/date-format"

export const MessagesBoxList = () => {
  const { data: users, isPending } = useQuery({
    queryKey: ["get-contacts"],
    queryFn: call(apiClient.contacts.$get),
  })

  return (
    <div className="border-t h-full bg-popover border-x flex flex-col">
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
          <div
            key={u.id}
            className="flex items-center gap-2 p-2 hover:bg-accent transition-colors cursor-pointer"
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
                <p className="font-medium text-sm line-clamp-1">{u.name}</p>
                <div className="text-xs text-muted-foreground">
                  {formatMessageDate(u.lastMessageAt)}
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {u.lastMessage || "No messages yet"}
              </p>
            </div>
          </div>
        ))}
    </div>
  )
}
