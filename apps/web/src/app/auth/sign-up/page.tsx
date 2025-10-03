import Link from "next/link"
import { SignUpForm } from "./_components/sign-up-form"
import Image from "next/image"

export default function Page() {
  return (
    <main className="bg-background flex min-h-dvh flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6">
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
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground text-sm">
            Enter your details below to create your account
          </p>
        </div>
        <SignUpForm />
        <div className="max-w-sm">
          <p className="text-muted-foreground px-4 text-center text-sm">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="text-primary hover:text-primary/80 underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-primary hover:text-primary/80 underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
