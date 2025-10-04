import { Slot } from "@radix-ui/react-slot"
import { cn } from "../lib/utils"

export const UnderlineButton = ({
  className,
  asChild,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(
        "after:bg-primary text-primary relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
        className,
      )}
      {...props}
    />
  )
}
