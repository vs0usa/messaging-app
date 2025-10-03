import { motion } from "framer-motion"
import { XIcon } from "lucide-react"
import { Avatar } from "@repo/ui/components/avatar"
import { useFloatingBoxes } from "@/hooks/use-floating-boxes"
import { useMessagesStore } from "@/stores/messages-store"

export const OpenedChats = () => {
  const { contacts, currentChat, setCurrentChat, closeChat } =
    useMessagesStore()
  const { filteredChats, computeOffset } = useFloatingBoxes()

  return (
    <div>
      {filteredChats.map((userId, i) => {
        const user = contacts.find((user) => user.id === userId)

        if (!user) return null

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
              className="relative flex cursor-pointer select-none items-center"
              onClick={() =>
                setCurrentChat(currentChat === userId ? null : userId)
              }
            >
              <div className="bg-popover hover:bg-accent relative flex h-12 w-full items-center gap-2 rounded-t-md border border-b-0 px-2 pr-12 transition-colors">
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
            <div className="bg-popover flex h-full flex-col overflow-y-auto border-x border-t">
              <p>azert</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
