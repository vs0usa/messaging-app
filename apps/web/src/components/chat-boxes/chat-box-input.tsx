import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"

type Props = {
  id: string
}

export const ChatBoxInput = ({ id }: Props) => {
  return (
    <div className="flex items-center gap-4 p-4">
      <Input placeholder="Type a message" />
      <Button variant="outline">Send</Button>
    </div>
  )
}
