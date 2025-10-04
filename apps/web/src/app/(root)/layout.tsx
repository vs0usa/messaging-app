import type { LayoutProps } from "@/utils/types"
import { ContactsContainer } from "@/components/contacts/contacts-container"
import { Navbar } from "./_components/navbar/navbar"

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <ContactsContainer />
    </>
  )
}
