import { Hono } from "hono"
import { authMiddleware } from "@/api/middlewares/auth-middleware"

export const app = new Hono().get("/:id", authMiddleware, (c) => {
  return c.var.send("azer")
})
