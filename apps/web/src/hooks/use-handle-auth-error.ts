"use client"

import { toast } from "@repo/ui/components/sonner"
import { authMessages } from "@repo/auth/utils"
import { ErrorContext } from "better-auth/react"

export const useHandleAuthError = () => {
  const handleError = ({ error }: ErrorContext) => {
    toast.error(
      error.code && error.code in authMessages
        ? authMessages[error.code as keyof typeof authMessages]
        : "An unexpected error occurred",
    )
  }

  return { handleError }
}
