import { useDebounceCallback } from "usehooks-ts"
import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import { useChat } from "@/hooks/use-chat"
import { useMessagesStore } from "@/stores/messages-store"

type Props = {
  id: string
}

export const ChatBoxInput = ({ id }: Props) => {
  const { typingRecipients } = useMessagesStore()
  const { sendTypingStart } = useChat()
  const isTyping = typingRecipients.includes(id)
  const debounced = useDebounceCallback(sendTypingStart, 1000, {
    maxWait: 2000,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounced(id)
    console.log("Changed input to", e.target.value)
  }

  return (
    <div className="flex flex-col gap-1 p-4">
      <p
        className="text-muted-foreground invisible text-sm data-[typing=true]:visible"
        data-typing={isTyping}
      >
        Recipient is typing...
      </p>
      <div className="flex gap-4">
        <Input placeholder="Type a message" onChange={handleChange} />
        <Button variant="outline">Send</Button>
      </div>
    </div>
  )
}
