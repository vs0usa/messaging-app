import type { LayoutProps } from "@/utils/types"
import { Navbar } from "./_components/navbar/navbar"
import { MessagesContainer } from "@/components/messages/messages-container"

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <MessagesContainer />
    </>
  )
}
