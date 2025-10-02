import {
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@repo/ui/components/dropdown-menu"
import { useTheme } from "next-themes"
import { SunIcon, MoonIcon, MonitorIcon } from "lucide-react"

export const NavbarCommonContent = () => {
  const { systemTheme, theme, setTheme } = useTheme()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        {theme === "light" && <SunIcon className="size-4" />}
        {theme === "dark" && <MoonIcon className="size-4" />}
        {theme === "system" && <MonitorIcon className="size-4" />}
        Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenuRadioItem
              className="[&>div>svg]:text-yellow-500 data-[light=false]:[&>div>svg]:text-zinc-500"
              value="system"
              data-light={systemTheme === "light"}
            >
              System
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className="[&>div>svg]:text-zinc-500"
              value="dark"
            >
              Dark
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className="[&>div>svg]:text-yellow-500"
              value="light"
            >
              Light
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
