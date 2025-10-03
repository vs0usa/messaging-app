import { authMiddleware } from "@/api/middlewares/auth-middleware"
import { Hono } from "hono"

export const app = new Hono().get("/:id", authMiddleware, (c) => {
  return c.var.send("azer")
})
