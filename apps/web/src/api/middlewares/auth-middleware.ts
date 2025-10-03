import { createMiddleware } from "hono/factory"
import { auth, User } from "@repo/auth/server"

type Env = {
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
