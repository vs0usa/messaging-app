"use client"

import { motion } from "framer-motion"
import { ChevronUpIcon } from "lucide-react"
import { Avatar } from "@repo/ui/components/avatar"
import { MessagesBoxList } from "@/components/messages/messages-box-list"
import { useUser } from "@/stores/auth-store"
import { useMessagesStore } from "@/stores/messages-store"

export const MessagesBox = () => {
  const user = useUser()
  const { boxExpanded, toggleBox } = useMessagesStore()

  return (
    <motion.div
      className="flex w-64 flex-col"
      initial={{ height: "48px" }}
      animate={{ height: boxExpanded ? "60vh" : "48px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        className="relative flex cursor-pointer select-none items-center"
        onClick={toggleBox}
      >
        <div className="bg-popover hover:bg-accent flex h-12 w-full items-center gap-2 rounded-t-md border border-b-0 px-2 transition-colors">
          <Avatar
            className="max-size-8"
            src={user!.image}
            height={32}
            width={32}
            alt="Avatar"
          />
          <p className="font-medium">Messages</p>
        </div>
        <div className="absolute right-2 flex">
          <button
            className="hover:bg-accent rounded-full p-2 transition-[background-color,rotate] data-[expanded=true]:rotate-180"
            data-expanded={boxExpanded}
            onClick={(e) => {
              e.stopPropagation()
              toggleBox()
            }}
          >
            <ChevronUpIcon className="text-muted-foreground size-4" />
          </button>
        </div>
      </div>
      <MessagesBoxList />
    </motion.div>
  )
}
