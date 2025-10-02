import { serve } from "@hono/node-server"
import { auth } from "@repo/auth/server"
import { config } from "@repo/config"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { env } from "./env"

const app = new Hono()

app.use(
  "/api/auth/*",
  cors({ origin: env.NEXT_PUBLIC_BASE_URL, credentials: true }),
)

app.on(["GET", "POST"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw)
})

app.get("/", (c) => {
  return c.text("Hello Hono!")
})

serve({ fetch: app.fetch, port: config.api.port }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
