"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
import { authClient } from "@repo/auth/client"
import { useForm } from "react-hook-form"
import z from "zod"
import { useHandleAuthError } from "@/hooks/use-handle-auth-error"
import { useRouter } from "next/navigation"
import { toast } from "@repo/ui/components/sonner"

const schema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
})

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  const { handleError } = useHandleAuthError()
  const router = useRouter()

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    await authClient.signUp.email({
      ...values,
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
          toast.success("Welcome to the app!")
        },
        onError: handleError,
      },
    })
  }

  return (
    <Form {...form}>
      <form
        className="w-full max-w-sm space-y-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormLabel>Password</FormLabel>
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
        <FormButton>Create Account</FormButton>
      </form>
    </Form>
  )
}
