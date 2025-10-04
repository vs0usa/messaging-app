import { ChevronsRightIcon } from "lucide-react"
import { Separator } from "@repo/ui/components/separator"
import { AddContactButton } from "@/components/contacts/add-contact-button"
import { Messages } from "@/components/messages/messages"
import { MessagesContactsList } from "@/components/messages/messages-contacts-list"

export default function Page() {
  return (
    <main className="mx-auto mt-[86] max-w-4xl px-4">
      <div className="bg-card flex h-[calc(100vh-86px)] flex-col rounded-t-xl">
        <div className="flex items-center justify-between p-4">
          <h1 className="flex items-center gap-2 text-xl font-bold md:text-2xl">
            <ChevronsRightIcon className="text-muted-foreground size-5 md:size-6" />
            Messages
          </h1>
          <AddContactButton />
        </div>
        <Separator className="w-10/12! self-center" />
        <div className="flex grow flex-row overflow-hidden">
          <MessagesContactsList />
          <Separator
            orientation="vertical"
            className="h-10/12! hidden self-center md:block"
          />
          <Messages />
        </div>
      </div>
    </main>
  )
}
