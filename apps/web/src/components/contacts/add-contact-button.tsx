"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { MailPlusIcon } from "lucide-react"
import type { Contact } from "@repo/api"
import { Avatar } from "@repo/ui/components/avatar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover"
import { useChat } from "@/hooks/use-chat"
import { useMessagesStore } from "@/stores/messages-store"
import { apiClient, call } from "@/utils/call"

export const AddContactButton = () => {
  const { askMessages } = useChat()
  const {
    contacts: existingContacts,
    addContacts,
    setMessages,
    setSelectedContactId,
  } = useMessagesStore()
  const [open, setOpen] = useState(false)
  const { data: contacts, isPending } = useQuery({
    queryKey: ["get-all-contacts"],
    queryFn: call(apiClient.contacts.all.$get),
  })

  const handleSelect = (contact: Contact) => () => {
    const existingContact = existingContacts.find((c) => c.id === contact.id)

    if (existingContact) {
      setSelectedContactId(existingContact.id)
      askMessages(contact.id)
      setOpen(false)
      return
    }

    addContacts([
      { ...contact, lastMessage: "", lastMessageAt: new Date().toISOString() },
    ])
    setMessages(contact.id, [])
    setSelectedContactId(contact.id)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="hover:bg-accent text-muted-foreground hover:text-foreground rounded-full p-2 transition-colors disabled:pointer-events-none disabled:opacity-50"
          disabled={isPending || !contacts}
        >
          <MailPlusIcon className="size-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0">
        <Command>
          <CommandInput placeholder="Search contacts..." className="h-9" />
          <CommandList>
            <CommandEmpty>No contacts found.</CommandEmpty>
            <CommandGroup>
              {contacts?.data.map((c) => (
                <CommandItem
                  key={c.id}
                  value={c.name}
                  onSelect={handleSelect(c)}
                >
                  <Avatar src={c.image} height={24} width={24} alt={c.name} />
                  <p>{c.name}</p>
                </CommandItem>
              ))}
              {/* {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))} */}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
