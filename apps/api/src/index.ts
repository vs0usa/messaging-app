import { serve } from "@hono/node-server"
import { createNodeWebSocket } from "@hono/node-ws"
import { Hono } from "hono"
import { hc } from "hono/client"
import { cors } from "hono/cors"
import { auth } from "@repo/auth/server"
import { db } from "@repo/db"
import { app as chatApp } from "./routes/chat"
import { app as contactsApp } from "./routes/contacts"
import { app as messagesApp } from "./routes/messages"
import { fail, send } from "./utils/context"

export const app = new Hono().basePath("/api")
const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app })

app.use((c, next) => {
  c.set("send", send(c))
  c.set("fail", fail(c))
  c.set("db", db)
  c.set("upgradeWebSocket", upgradeWebSocket)

  return next()
})

app.use(cors())
app.on(["GET", "POST"], "/auth/*", (c) => auth.handler(c.req.raw))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/contacts", contactsApp)
  .route("/messages", messagesApp)
  .route("/chat", chatApp)

app.onError((err, c) => {
  console.error(err)

  return c.var.fail("internal_server_error")
})

const server = serve({ fetch: app.fetch, port: 3001 }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

injectWebSocket(server)

export type AppType = typeof routes

// import { serve } from "@hono/node-server"
// import { createNodeWebSocket } from "@hono/node-ws"
// import { Hono } from "hono"

// const app = new Hono()

// const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app })

// app.get(
//   "/ws",
//   upgradeWebSocket((c) => ({
//     onOpen: (_, ws) => {
//       console.log("onOpen")
//     },
//     onMessage: (event, ws) => {
//       console.log("onMessage", event.data.toString())
//     },
//     onClose: () => {
//       console.log("onClose")
//     },
//     onError: (error) => {
//       console.log("onError", error)
//     },
//     // https://hono.dev/helpers/websocket
//   })),
// )

// const server = serve({ fetch: app.fetch, port: 3001 })
// injectWebSocket(server)
