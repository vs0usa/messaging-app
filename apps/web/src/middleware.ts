import type { NextRequest} from "next/server";
import { NextResponse } from "next/server"
import { getSession } from "@/utils/get-session"

export default async function middleware(req: NextRequest) {
  const session = await getSession()

  // User trying to access auth-related routes while signed in
  if (req.nextUrl.pathname.startsWith("/auth/") && session) {
    return NextResponse.redirect(new URL("/", req.url))
  }
}

export const config = {
  runtime: "nodejs",
  matcher: ["/auth/:path*"],
}
