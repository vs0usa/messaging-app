import { motion } from "framer-motion"
import { XIcon } from "lucide-react"
import { Avatar } from "@repo/ui/components/avatar"
import { MessagesInput } from "@/components/messages/messages-input"
import { MessagesRecipient } from "@/components/messages/messages-recipient"
import { useFloatingBoxes } from "@/hooks/use-floating-boxes"
import { useMessagesStore } from "@/stores/messages-store"

type Props = {
  userId: string
  index: number
}

export const ChatBox = ({ userId, index }: Props) => {
  const { contacts, recipientId, setRecipientId, closeChat } =
    useMessagesStore()
  const { computeOffset } = useFloatingBoxes()
  const user = contacts.find((user) => user.id === userId)

  if (!user) return null

  return (
    <motion.div
      key={userId}
      className="fixed bottom-0 transition-transform duration-300"
      initial={{ width: 208, height: 48, right: computeOffset(index) }}
      animate={
        recipientId === userId
          ? { width: 384, height: "60vh", right: computeOffset(index) }
          : { width: 208, height: 48, right: computeOffset(index) }
      }
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        className="relative flex cursor-pointer select-none items-center"
        onClick={() => setRecipientId(recipientId === userId ? null : userId)}
      >
        <div className="bg-card hover:bg-accent relative flex h-12 w-full items-center gap-2 rounded-t-md border border-b-0 px-2 pr-12 transition-colors">
          <Avatar
            className="max-size-8"
            src={user.image}
            height={32}
            width={32}
            alt={user.name}
          />
          <p className="line-clamp-1 font-medium">{user.name}</p>
        </div>
        <div className="absolute right-2 flex">
          <button
            className="hover:bg-accent rounded-full p-2 transition-[background-color,rotate]"
            onClick={(e) => {
              e.stopPropagation()
              closeChat(userId)
            }}
          >
            <XIcon className="text-muted-foreground size-4" />
          </button>
        </div>
      </div>
      <div className="bg-card flex h-full flex-col border-x border-t">
        <MessagesRecipient className="h-[calc(100%-140px)]" recipient={user} />
        <MessagesInput recipientId={user.id} />
      </div>
    </motion.div>
  )
}
