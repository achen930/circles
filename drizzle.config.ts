import { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config({
  path: ".env",
})

export default defineConfig({
  schema: "./src/db/schema/*",
  dialect: "turso",
  dbCredentials: {
    url:
      (process.env.NODE_ENV || "").trim() === "production"
        ? process.env.TURSO_CONNECTION_URL!
        : "http://127.0.0.1:8080",
    ...((process.env.NODE_ENV || "").trim() === "production" && {
      authToken: process.env.TURSO_AUTH_TOKEN!,
    }),
  },
  verbose: true,
  strict: true,
  out: "./drizzle",
})
