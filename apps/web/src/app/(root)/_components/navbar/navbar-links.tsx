"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HouseIcon, MailsIcon } from "lucide-react"
import { UnderlineButton } from "@repo/ui/components/underline-button"

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
  },
]

export const NavbarLinks = () => {
  const pathname = usePathname()

  return (
    <div className="flex gap-8">
      {items.map((item) => (
        <UnderlineButton
          key={item.href}
          className="px-2 after:-bottom-[11px] after:h-0.5 data-[active=true]:after:scale-x-100"
          data-active={pathname === item.href}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="size-8" />
          </Link>
        </UnderlineButton>
      ))}
    </div>
  )
}
