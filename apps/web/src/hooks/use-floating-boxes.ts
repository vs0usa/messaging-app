import { useCallback, useEffect, useMemo, useState } from "react"
import { useMessagesStore } from "@/stores/messages-store"

const PERMANENT_BOX_WIDTH = 256 // Messages box width
const RIGHT_PADDING = 32 // Right padding
const CHATBOX_WIDTH = 208 // Default chatbox width
const EXPANDED_CHATBOX_WIDTH = 384 // Expanded chatbox width
const GAP = 16 // Gap between chatboxes

export const useFloatingBoxes = () => {
  const { openChats, recipientId } = useMessagesStore()
  const [availableWidth, setAvailableWidth] = useState(0)
  const allowedItems = useMemo(() => {
    if (availableWidth < 224) return 0
    const remainingWidth = availableWidth - 384 // First chat is wider
    return Math.floor(remainingWidth / 224) + 1 // Add 1 to include first chat
  }, [availableWidth])
  const filteredChats = useMemo(
    () => openChats.slice(Math.max(openChats.length - allowedItems, 0)),
    [openChats, allowedItems],
  )

  const getAvailableWidth = () => {
    if (typeof window === "undefined") return 0

    return Math.max(0, window.innerWidth - PERMANENT_BOX_WIDTH - RIGHT_PADDING)
  }

  const computeOffset = useCallback(
    (i: number) => {
      // Start from the right edge, accounting for permanent box + padding
      let rightOffset = PERMANENT_BOX_WIDTH + RIGHT_PADDING

      // Calculate positions from right to left
      for (let j = filteredChats.length - 1; j >= i; j--) {
        const chatId = filteredChats[j]
        const isExpanded = recipientId === chatId

        if (j === i) {
          // This is the current chatbox we're positioning
          break
        }

        // Add width of this chatbox + gap
        const chatboxWidth = isExpanded ? EXPANDED_CHATBOX_WIDTH : CHATBOX_WIDTH
        rightOffset += chatboxWidth + GAP
      }

      return `${rightOffset}px`
    },
    [filteredChats, recipientId],
  )

  useEffect(() => {
    setAvailableWidth(getAvailableWidth())

    const handleResize = () => {
      setAvailableWidth(getAvailableWidth())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return { allowedItems, filteredChats, computeOffset }
}
