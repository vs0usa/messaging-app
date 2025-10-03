import Link from "next/link"
import { MailsIcon, SettingsIcon } from "lucide-react"
import { authClient } from "@repo/auth/client"
import { Avatar } from "@repo/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import { toast } from "@repo/ui/components/sonner"
import { useHandleAuthError } from "@/hooks/use-handle-auth-error"
import { useAuth } from "@/stores/auth-store"
import { NavbarCommonContent } from "./navbar-common-content"

export const NavbarAuthedContent = () => {
  const { user, signOut } = useAuth()
  const { handleError } = useHandleAuthError()

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onError: handleError,
        onSuccess: () => {
          signOut()
          toast.success("Signed out successfully")
        },
      },
    })
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none" suppressHydrationWarning>
          <Avatar
            src={user.image}
            className="max-size-9 hover:opacity-80"
            width={40}
            height={40}
            radius="full"
            alt="Avatar"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/messages">
            <MailsIcon />
            Messages
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <SettingsIcon />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <NavbarCommonContent />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} variant="destructive">
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
