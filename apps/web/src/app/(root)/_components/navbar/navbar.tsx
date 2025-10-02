"use client"

import { NavbarAuthedContent } from "./navbar-authed-content"
import { NavbarUnauthedContent } from "./navbar-unauthed-content"
import { useUser } from "@/stores/auth-store"
import Image from "next/image"
import Link from "next/link"

export const Navbar = () => {
  const user = useUser()

  return (
    <nav className="fixed top-0 z-10 flex px-4 py-3 m-4 bg-sidebar h-14 rounded-xl w-[-webkit-fill-available] justify-between items-center border">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Messaging App Logo"
          width={40}
          height={24}
        />
      </Link>
      {user && <NavbarAuthedContent />}
      {!user && <NavbarUnauthedContent />}
    </nav>
  )
}
