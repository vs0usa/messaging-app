import type { LayoutProps } from "@/utils/types"
import { MessagesContainer } from "@/components/messages/messages-container"
import { Navbar } from "./_components/navbar/navbar"

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <MessagesContainer />
    </>
  )
}
