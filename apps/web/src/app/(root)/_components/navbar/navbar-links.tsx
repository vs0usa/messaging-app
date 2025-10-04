"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HouseIcon, MailsIcon } from "lucide-react"
import { UnderlineButton } from "@repo/ui/components/underline-button"
import { useUser } from "@/stores/auth-store"

const items = [
  {
    href: "/",
    icon: HouseIcon,
    label: "Home",
  },
  {
    href: "/messages",
    icon: MailsIcon,
    label: "Messages",
    authed: true,
  },
]

export const NavbarLinks = () => {
  const pathname = usePathname()
  const user = useUser()

  return (
    <div className="flex gap-4 md:gap-8">
      {items.map((item) => {
        if (item.authed && !user) return null

        return (
          <UnderlineButton
            key={item.href}
            className="px-2 after:-bottom-[13px] after:h-0.5 data-[active=true]:after:scale-x-100 md:after:-bottom-[11px]"
            data-active={pathname === item.href}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="size-7 md:size-8" />
            </Link>
          </UnderlineButton>
        )
      })}
    </div>
  )
}
