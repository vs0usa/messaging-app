import type { ChatMessage } from "@repo/api"
import type { User } from "@repo/auth/server"
import { Avatar } from "@repo/ui/components/avatar"
import { MessageDeleteButton } from "@/components/messages/messages-delete-button"
import { useUser } from "@/stores/auth-store"
import { formatMessageDate } from "@/utils/date-format"

type Props = {
  recipient: Pick<User, "id" | "name" | "image">
  message: ChatMessage
}

export const MessageBubble = ({ recipient, message }: Props) => {
  const user = useUser()

  if (!user) return null

  const msgUser = message.senderId === recipient.id ? recipient : user

  return (
    <div
      key={message.id}
      className="hover:bg-accent group/message relative flex items-center gap-2 px-4 py-1 transition-colors"
    >
      <Avatar
        src={msgUser.image}
        className="max-size-10 place-self-start self-start"
        classNames={{ base: "place-self-start pt-1" }}
        height={40}
        width={40}
        alt={msgUser.name}
      />
      <div>
        <div className="flex items-center gap-1">
          <p className="line-clamp-1 font-medium">{msgUser.name}</p>
          <p className="text-muted-foreground min-w-fit select-none text-xs">
            • {formatMessageDate(message.createdAt)}
          </p>
        </div>
        <p className="text-foreground/80 text-sm">{message.content}</p>
      </div>
      {msgUser.id === user.id && <MessageDeleteButton id={message.id} />}
    </div>
  )
}
