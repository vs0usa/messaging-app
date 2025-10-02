import { auth } from "@repo/auth/server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { app as contactsApp } from "./routes/contacts"
import { app as messagesApp } from "./routes/messages"
import { fail, send } from "./utils/context"
import { db } from "@repo/db"

export const app = new Hono().basePath("/api")

app.use((c, next) => {
  c.set("send", send(c))
  c.set("fail", fail(c))
  c.set("db", db)

  return next()
})

app.use(cors())
app.on(["GET", "POST"], "/auth/*", (c) => auth.handler(c.req.raw))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/contacts", contactsApp)
  .route("/messages", messagesApp)

app.onError((err, c) => {
  console.error(err)

  return c.var.fail("internal_server_error")
})

export type AppType = typeof routes
