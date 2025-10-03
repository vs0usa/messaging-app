import { Hono } from "hono"
import { authMiddleware } from "../middlewares/auth-middleware"

export const app = new Hono().get("/:id", authMiddleware, (c) =>
  c.var.upgradeWebSocket(c, {
    onMessage: (_event, _ws) => {
      console.log("onMessage", JSON.stringify(_event.data))
    },
  }),
)
