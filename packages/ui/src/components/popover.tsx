"use client"

import type { ComponentProps } from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "../lib/utils"

export const Popover = (
  props: ComponentProps<typeof PopoverPrimitive.Root>,
) => <PopoverPrimitive.Root data-slot="popover" {...props} />

export const PopoverTrigger = (
  props: ComponentProps<typeof PopoverPrimitive.Trigger>,
) => <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />

export const PopoverContent = ({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      data-slot="popover-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin) outline-hidden z-50 w-72 rounded-md border p-4 shadow-md",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
)

export const PopoverAnchor = (
  props: ComponentProps<typeof PopoverPrimitive.Anchor>,
) => <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
