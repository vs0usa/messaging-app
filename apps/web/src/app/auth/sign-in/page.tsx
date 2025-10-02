import { Link } from "@/components/ui/link"
import { SignInForm } from "./_components/sign-in-form"
import Image from "next/image"

export default function Page() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="mb-4">
            <Image
              src="/logo.png"
              alt="Messaging App Logo"
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-sm">
            Enter your credentials to sign in to your account
          </p>
        </div>
        <SignInForm />
        <div className="max-w-sm text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account yet?{" "}
            <Link href="/auth/sign-up">Sign up</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
