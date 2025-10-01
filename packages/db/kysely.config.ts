import { defineConfig } from "kysely-ctl"
import { dbConfig } from "./src"

export default defineConfig({
  dialect: "pg",
  dialectConfig: dbConfig,
})
