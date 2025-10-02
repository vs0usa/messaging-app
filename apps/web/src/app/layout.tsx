import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cn } from "@repo/ui/lib/utils"
import "./globals.css"
import { Toaster } from "@repo/ui/components/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Messaging",
  description: "A modern messaging application",
  appleWebApp: {
    title: "Messaging",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon0.svg", type: "image/svg+xml" },
      { url: "/icon1.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background text-foreground antialiased",
          inter.className,
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
