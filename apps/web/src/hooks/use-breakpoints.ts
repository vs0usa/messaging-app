import { useEffect, useState } from "react"

export const useBreakpoints = () => {
  const [dynamicWidth, setDynamicWidth] = useState(0)

  const getSkeletonWidth = () => {
    if (typeof window === "undefined") return 0

    console.log(window.innerWidth)

    const viewportWidth = window.innerWidth
    const emptySpace = 48 // padding 32px (p-4) + gap 16px
    const messageBoxWidth = 256 // 256px (w-64)

    return Math.max(0, viewportWidth - emptySpace - messageBoxWidth)
  }

  useEffect(() => {
    setDynamicWidth(getSkeletonWidth())

    const handleResize = () => {
      setDynamicWidth(getSkeletonWidth())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return { dynamicWidth }
}
