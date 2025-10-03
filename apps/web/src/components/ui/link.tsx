import { cn } from "@repo/ui/lib/utils"
import NextLink from "next/link"
import { ComponentProps } from "react"

export const Link = ({
  className,
  ...props
}: ComponentProps<typeof NextLink> & { className?: string }) => (
  <NextLink
    className={cn(
      "text-primary hover:text-primary/80 text-sm underline",
      className,
    )}
    {...props}
  />
)
