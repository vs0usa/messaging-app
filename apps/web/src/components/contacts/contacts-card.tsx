import type { User } from "@repo/auth/server"
import { Avatar } from "@repo/ui/components/avatar"
import { useMessagesStore } from "@/stores/messages-store"
import { formatMessageDate } from "@/utils/date-format"

type Props = {
  contact: Pick<User, "id" | "name" | "image"> & {
    lastMessage: string
    lastMessageAt: string
  }
  onClick: () => void
}

export const ContactsCard = ({ contact: c, onClick }: Props) => {
  const { messages } = useMessagesStore()

  const getLatestMessage = (userId: string, defaultMessage: string) => {
    return messages[userId]?.at(-1)?.content ?? defaultMessage
  }

  return (
    <button
      key={c.id}
      className="hover:bg-accent flex w-full cursor-pointer items-center gap-2 p-2 text-start transition-colors"
      onClick={onClick}
    >
      <Avatar
        className="max-size-10"
        src={c.image}
        height={40}
        width={40}
        alt={c.name}
      />
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between gap-1">
          <p className="line-clamp-1 text-sm font-medium">{c.name}</p>
          <div className="text-muted-foreground min-w-fit text-xs">
            {formatMessageDate(c.lastMessageAt)}
          </div>
        </div>
        <p className="text-muted-foreground line-clamp-2 text-xs">
          {getLatestMessage(c.id, c.lastMessage)}
        </p>
      </div>
    </button>
  )
}
