import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { usersTable } from "./users"
import { circlesTable } from "./circles"

export const tokensTable = sqliteTable("tokens", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
  creatorId: integer("creator_id")
    .notNull()
    .references(() => usersTable.id),
  circleId: integer("circle_id")
    .notNull()
    .references(() => circlesTable.id),
  accessToken: text("access_token").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch() + 7 * 24 * 60 *60)`),
})
