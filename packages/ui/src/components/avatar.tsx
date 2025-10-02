import { UserIcon } from "lucide-react"
import { Image, type ImageProps } from "./image"
import { cn } from "../lib/utils"

type Props = Omit<ImageProps, "src"> & { src?: string | null }

export const Avatar = ({ src, className, ...props }: Props) => {
  if (src) {
    return <Image src={src} className={className} {...props} />
  }

  return (
    <div
      className={cn(
        "relative rounded-full bg-accent p-2 text-accent-foreground",
        className,
      )}
      style={{
        width: props.width,
        height: props.height,
        transition:
          "color 200ms, background 200ms, opacity 200ms, width 300ms, height 300ms, min-width 300ms, min-height 300ms, max-width 300ms, max-height 300ms, padding 300ms",
      }}
    >
      <UserIcon className="size-full transition-all" />
    </div>
  )
}
