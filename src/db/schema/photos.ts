import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { usersTable } from "./users"
import { albumsTable } from "./albums"

export const photosTable = sqliteTable("photos", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  albumId: integer("album_id")
    .notNull()
    .references(() => albumsTable.id),
  src: text("src").notNull(),
  latitude: text("latitude"),
  longitude: text("longitude"),
})
