import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { usersTable } from "./users"
import { albumsTable } from "./albums"
import { circlesTable } from "./circles"
import { commentsTable } from "./comments"
import { likesTable } from "./likes"
import { photosTable } from "./photos"

export const activitiesTable = sqliteTable("acitivites", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
  userId: integer("id")
    .notNull()
    .references(() => usersTable.id),
  albumId: integer("album_id").references(() => albumsTable.id),
  commentId: integer("comment_id").references(() => commentsTable.id),
  repliedToUserId: integer("repliedToUserId").references(() => usersTable.id),
  likeId: integer("like_id").references(() => likesTable.id),
  photoId: integer("photo_id").references(() => photosTable.id),
  type: text("type"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})
