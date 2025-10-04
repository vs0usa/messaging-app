import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { Avatar } from "@repo/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import { NavbarCommonContent } from "./navbar-common-content"

export const NavbarUnauthedContent = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none" type="button" suppressHydrationWarning>
          <Avatar
            className="max-size-9 hover:opacity-80"
            width={40}
            height={40}
            radius="full"
            alt="Avatar"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <NavbarCommonContent />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:[&_svg]:translate-x-1" asChild>
          <Link href="/auth/sign-in">
            Sign In
            <ArrowRightIcon className="transition-transform" />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
