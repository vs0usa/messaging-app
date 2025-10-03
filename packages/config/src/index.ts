import { configEnv } from "./env"

export const config = {
  web: {
    baseUrl: configEnv.NEXT_PUBLIC_BASE_URL,
  },
  api: {
    port: configEnv.API_PORT,
    baseUrl: configEnv.NEXT_PUBLIC_BASE_API_URL,
  },
  auth: {
    password: {
      minLength: 8,
      maxLength: 50,
    },
  },
}
