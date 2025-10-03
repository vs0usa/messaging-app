import { ChatBox } from "@/components/chat-boxes/chat-box"
import { useChat } from "@/hooks/use-chat"
import { useFloatingBoxes } from "@/hooks/use-floating-boxes"

export const ChatBoxesContainer = () => {
  const { filteredChats } = useFloatingBoxes()

  useChat()

  return filteredChats.map((userId, i) => (
    <ChatBox key={userId} userId={userId} index={i} />
  ))
}
