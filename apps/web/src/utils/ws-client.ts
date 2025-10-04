import { apiClient } from "@/utils/call"

let socket: WebSocket | null = null

export function getSocket() {
  socket ??= apiClient.chat.$ws()
  return socket
}
