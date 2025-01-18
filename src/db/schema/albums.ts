import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { usersTable } from "./users"
import { circlesTable } from "./circles"

export const albumsTable = sqliteTable("albums", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
  ownerId: integer("owner_id")
    .notNull()
    .references(() => usersTable.id),
  circleId: integer("circle_id").references(() => circlesTable.id),
  name: text("name").notNull(),
  likeCount: integer("like_count").notNull().default(0),
  latitude: text("latitude"),
  longitude: text("longitude"),
})
