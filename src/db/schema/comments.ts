import { sql } from "drizzle-orm"

import { foreignKey, integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { usersTable } from "./users"
import { albumsTable } from "./albums"

export const commentsTable = sqliteTable(
  "comments",
  {
    id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id),
    albumId: integer("album_id")
      .notNull()
      .references(() => albumsTable.id),
    message: text("message").notNull(),
    likeCount: integer("like_count").notNull().default(0),
    parentId: integer("parent_id"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (commentsTable) => ({
    selfRef: foreignKey({
      columns: [commentsTable.parentId],
      foreignColumns: [commentsTable.id],
    }),
  })
)
