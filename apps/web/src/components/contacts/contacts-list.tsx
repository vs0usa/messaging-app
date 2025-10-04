"use client"

import { useEffect, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { ContactsCard } from "@/components/contacts/contacts-card"
import { ContactsListSkeleton } from "@/components/contacts/contacts-list-skeleton"
import { useMessagesStore } from "@/stores/messages-store"
import { apiClient, call } from "@/utils/call"

type Props = {
  onClick: (userId: string) => void
}

export const ContactsList = ({ onClick }: Props) => {
  const { data: users, isPending } = useQuery({
    queryKey: ["get-contacts"],
    queryFn: call(apiClient.contacts.$get),
  })
  const { contacts, setContacts } = useMessagesStore()
  const sortedUsers = useMemo(
    () =>
      contacts.sort(
        (a, b) =>
          new Date(b.lastMessageAt).getTime() -
          new Date(a.lastMessageAt).getTime(),
      ),
    [contacts],
  )

  // Set contacts once they are fetched
  useEffect(() => {
    if (!users) return

    setContacts(users.data)
  }, [setContacts, users])

  if (isPending) return <ContactsListSkeleton />

  return sortedUsers.map((u) => (
    <ContactsCard key={u.id} contact={u} onClick={() => onClick(u.id)} />
  ))
}
