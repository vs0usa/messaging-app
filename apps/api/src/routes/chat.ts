import { Hono } from "hono"
import { authMiddleware } from "../middlewares/auth-middleware"

export const app = new Hono().get("/:id", (c) =>
  c.var.upgradeWebSocket(c, {
    onMessage: (event, ws) => {
      console.log("onMessage", event.data.toString())
    },
  }),
)
