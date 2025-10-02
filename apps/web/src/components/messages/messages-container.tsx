"use client"

import { useAuth } from "@/stores/auth-store"
import { MessagesBox } from "./messages-box"
import { Skeleton } from "@repo/ui/components/skeleton"
// import { useBreakpoints } from "@/hooks/use-breakpoints"

export const MessagesContainer = () => {
  const { user } = useAuth()
  // const { dynamicWidth } = useBreakpoints()

  if (!user) return null

  return (
    <div className="fixed bottom-0 w-screen z-10 px-4 md:flex flex-row-reverse gap-4 hidden">
      <MessagesBox />
      {/* <Skeleton
        className="h-12 rounded-t-md rounded-b-none"
        style={{ width: dynamicWidth }}
      /> */}
      <Skeleton
        className="fixed bottom-0 h-12 rounded-t-md rounded-b-none w-48"
        style={{ right: `calc(288px + (208px * 0))` }}
      />
      <Skeleton
        className="fixed bottom-0 h-12 rounded-t-md rounded-b-none w-48"
        style={{ right: `calc(288px + (208px * 1))` }}
      />
      <Skeleton
        className="fixed bottom-0 h-12 rounded-t-md rounded-b-none w-48"
        style={{ right: `calc(288px + (208px * 2))` }}
      />
    </div>
  )
}
