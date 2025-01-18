import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { usersTable } from "./users"
import { albumsTable } from "./albums"
import { commentsTable } from "./comments"

export const likesTable = sqliteTable("likes", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  albumId: integer("album_id").references(() => albumsTable.id),
  commentId: integer("comment_id").references(() => commentsTable.id),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})
