"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { LayoutProps } from "@/utils/types"

export const Providers = ({ children }: LayoutProps) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
