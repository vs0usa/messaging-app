import { useMessagesStore } from "@/stores/messages-store"
import { Avatar } from "@repo/ui/components/avatar"
import { XIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useFloatingBoxes } from "@/hooks/use-floating-boxes"

export const OpenedChats = () => {
  const { contacts, currentChat, setCurrentChat, closeChat } =
    useMessagesStore()
  const { filteredChats, computeOffset } = useFloatingBoxes()

  return (
    <div>
      {filteredChats.map((userId, i) => {
        const user = contacts.find((user) => user.id === userId)!

        return (
          <motion.div
            key={userId}
            className="fixed bottom-0 transition-transform duration-300"
            initial={{ width: 208, height: 48, right: computeOffset(i) }}
            animate={
              currentChat === userId
                ? { width: 384, height: "60vh", right: computeOffset(i) }
                : { width: 208, height: 48, right: computeOffset(i) }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div
              className="flex items-center relative select-none cursor-pointer"
              onClick={() =>
                setCurrentChat(currentChat === userId ? null : userId)
              }
            >
              <div className="flex gap-2 items-center w-full bg-popover hover:bg-accent px-2 h-12 transition-colors rounded-t-md border border-b-0 relative pr-12">
                <Avatar
                  className="max-size-8"
                  src={user.image}
                  height={32}
                  width={32}
                  alt={user.name}
                />
                <p className="font-medium line-clamp-1">{user.name}</p>
              </div>
              <div className="flex absolute right-2">
                <button
                  className="p-2 hover:bg-accent transition-[background-color,rotate] rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    closeChat(userId)
                  }}
                >
                  <XIcon className="size-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            <div className="border-t h-full bg-popover border-x flex flex-col overflow-y-auto">
              <p>azert</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
