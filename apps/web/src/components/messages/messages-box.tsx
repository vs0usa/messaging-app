"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useUser } from "@/stores/auth-store"
import { Avatar } from "@repo/ui/components/avatar"
import { ChevronUpIcon } from "lucide-react"

import { MessagesBoxList } from "@/components/messages/messages-box-list"

export const MessagesBox = () => {
  const user = useUser()
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <motion.div
      className="w-64 flex flex-col"
      initial={{ height: "48px" }}
      animate={{ height: isExpanded ? "60vh" : "48px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        className="flex items-center relative select-none cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex gap-2 items-center w-full bg-popover hover:bg-accent px-2 h-12 transition-colors rounded-t-md border border-b-0">
          <Avatar
            className="max-size-8"
            src={user!.image}
            height={32}
            width={32}
            alt="Avatar"
          />
          <p className="font-medium">Messages</p>
        </div>
        <div className="flex absolute right-2">
          <button
            className="p-2 hover:bg-accent transition-[background-color,rotate] rounded-full data-[expanded=true]:rotate-180"
            data-expanded={isExpanded}
            onClick={(e) => {
              e.stopPropagation()
              toggleExpanded()
            }}
          >
            <ChevronUpIcon className="size-4 text-muted-foreground" />
          </button>
        </div>
      </div>
      <MessagesBoxList />
    </motion.div>
  )
}
