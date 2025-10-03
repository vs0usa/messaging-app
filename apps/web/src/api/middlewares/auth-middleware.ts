import { createMiddleware } from "hono/factory"
import type { User } from "@repo/auth/server"
import { auth } from "@repo/auth/server"

interface Env {
  Variables: {
    user: User
  }
}

export const authMiddleware = createMiddleware<Env>(
  async ({ set, req, var: { fail } }, next) => {
    const session = await auth.api.getSession({
      headers: req.raw.headers,
    })

    if (!session) {
      return fail("UNAUTHORIZED")
    }

    set("user", session.user)

    return next()
  },
)
