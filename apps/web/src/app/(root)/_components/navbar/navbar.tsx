"use client"

import Image from "next/image"
import Link from "next/link"
import { NavbarLinks } from "@/app/(root)/_components/navbar/navbar-links"
import { useUser } from "@/stores/auth-store"
import { NavbarAuthedContent } from "./navbar-authed-content"
import { NavbarUnauthedContent } from "./navbar-unauthed-content"

export const Navbar = () => {
  const user = useUser()

  return (
    <nav className="bg-sidebar fixed top-0 z-10 m-4 flex h-14 w-[-webkit-fill-available] items-center justify-between rounded-xl border px-4 py-3">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Messaging App Logo"
          width={40}
          height={24}
        />
      </Link>
      <NavbarLinks />
      {user && <NavbarAuthedContent />}
      {!user && <NavbarUnauthedContent />}
    </nav>
  )
}
