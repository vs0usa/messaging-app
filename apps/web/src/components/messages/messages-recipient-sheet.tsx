import { useEffect, useState } from "react"
import { Avatar } from "@repo/ui/components/avatar"
import { Separator } from "@repo/ui/components/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/components/sheet"
import { MessagesInput } from "@/components/messages/messages-input"
import { MessagesRecipient } from "@/components/messages/messages-recipient"
import { useIsMobile } from "@/hooks/use-mobile"
import { useMessagesStore } from "@/stores/messages-store"

export const MessagesRecipientSheet = () => {
  const { selectedContactId, contacts } = useMessagesStore()
  const isMobile = useIsMobile()
  const recipient = contacts.find((c) => c.id === selectedContactId)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isMobile || !recipient) return

    setIsOpen(true)
  }, [isMobile, recipient])

  if (!recipient) return null

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-screen">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Avatar
              src={recipient.image}
              className="max-size-10"
              alt={recipient.name}
              classNames={{ base: "max-size-10" }}
              width={40}
              height={40}
            />
            {recipient.name}
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-0" />
        <div className="h-full">
          <MessagesRecipient recipient={recipient} />
          <MessagesInput recipientId={recipient.id} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
