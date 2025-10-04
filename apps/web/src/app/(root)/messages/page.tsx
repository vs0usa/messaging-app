import { ChevronsRightIcon } from "lucide-react"
import { Separator } from "@repo/ui/components/separator"
import { Messages } from "@/components/messages/messages"
import { MessagesContactsList } from "@/components/messages/messages-contacts-list"
import { MessagesInput } from "@/components/messages/messages-input"

export default function Page() {
  return (
    <main className="mx-auto mt-[86] max-w-4xl px-4">
      <div className="bg-card flex h-[calc(100vh-86px)] flex-col rounded-t-xl">
        <h1 className="flex items-center gap-2 p-4 text-xl font-bold md:text-2xl">
          <ChevronsRightIcon className="text-muted-foreground size-5 md:size-6" />
          Messages
        </h1>
        <Separator className="w-10/12! self-center" />
        <div className="flex grow flex-row">
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
