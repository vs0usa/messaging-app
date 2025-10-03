import type { HTMLAttributes } from "react"
import { cn } from "../lib/utils"

export const Skeleton = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("bg-accent animate-pulse rounded", className)}
    {...props}
  />
)
