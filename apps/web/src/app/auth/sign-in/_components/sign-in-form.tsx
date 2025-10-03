"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"
import type { User } from "@repo/auth/server"
import { authClient } from "@repo/auth/client"
import {
  Form,
  FormButton,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { toast } from "@repo/ui/components/sonner"
import { Link } from "@/components/ui/link"
import { useHandleAuthError } from "@/hooks/use-handle-auth-error"
import { useAuth } from "@/stores/auth-store"

const schema = z.object({
  email: z.email(),
  password: z.string().min(1),
})

export const SignInForm = () => {
  const { handleError } = useHandleAuthError()
  const { signIn } = useAuth()
  const router = useRouter()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    await authClient.signIn.email({
      ...values,
      fetchOptions: {
        onError: handleError,
        onSuccess: (data) => {
          signIn((data.data as { user: User }).user)
          router.push("/")
          toast.success("Welcome to the app!")
        },
      },
    })
  }

  return (
    <Form {...form}>
      <form
        className="w-full max-w-sm space-y-4 md:min-w-96"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link href="#" tabIndex={-1}>
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButton>Sign In</FormButton>
      </form>
    </Form>
  )
}
