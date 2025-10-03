import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cn } from "@repo/ui/lib/utils"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@repo/ui/components/sonner"
import { AuthStoreProvider } from "@/stores/auth-store"
import { getSession } from "@/utils/get-session"
import type { LayoutProps } from "@/utils/types"
import { Providers } from "./_components/providers"

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

export default async function RootLayout({ children }: LayoutProps) {
  const session = await getSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background text-foreground antialiased",
          inter.className,
        )}
      >
        <ThemeProvider attribute="class">
          <AuthStoreProvider session={session}>
            <Providers>
              {children}
              <Toaster />
            </Providers>
          </AuthStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
