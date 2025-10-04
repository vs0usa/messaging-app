"use client"

import type { ComponentProps } from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"
import { cn } from "../lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog"

export const Command = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive>) => (
  <CommandPrimitive
    data-slot="command"
    className={cn(
      "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
      className,
    )}
    {...props}
  />
)

export const CommandDialog = ({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) => (
  <Dialog {...props}>
    <DialogHeader className="sr-only">
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
    <DialogContent
      className={cn("overflow-hidden p-0", className)}
      showCloseButton={showCloseButton}
    >
      <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
        {children}
      </Command>
    </DialogContent>
  </Dialog>
)

export const CommandInput = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Input>) => (
  <div
    data-slot="command-input-wrapper"
    className="flex h-9 items-center gap-2 border-b px-3"
  >
    <SearchIcon className="size-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      data-slot="command-input"
      className={cn(
        "placeholder:text-muted-foreground outline-hidden flex h-10 w-full rounded-md bg-transparent py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
)

export const CommandList = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List
    data-slot="command-list"
    className={cn(
      "max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden",
      className,
    )}
    {...props}
  />
)

export const CommandEmpty = ({
  ...props
}: ComponentProps<typeof CommandPrimitive.Empty>) => (
  <CommandPrimitive.Empty
    data-slot="command-empty"
    className="py-6 text-center text-sm"
    {...props}
  />
)

export const CommandGroup = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group
    data-slot="command-group"
    className={cn(
      "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
      className,
    )}
    {...props}
  />
)

export const CommandSeparator = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Separator>) => (
  <CommandPrimitive.Separator
    data-slot="command-separator"
    className={cn("bg-border -mx-1 h-px", className)}
    {...props}
  />
)

export const CommandItem = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Item>) => (
  <CommandPrimitive.Item
    data-slot="command-item"
    className={cn(
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
)

export const CommandShortcut = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    data-slot="command-shortcut"
    className={cn(
      "text-muted-foreground ml-auto text-xs tracking-widest",
      className,
    )}
    {...props}
  />
)
