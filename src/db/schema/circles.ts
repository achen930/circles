import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { usersTable } from "./users"

export const circlesTable = sqliteTable("circles", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
  ownerId: integer("owner_id")
    .notNull()
    .references(() => usersTable.id),
  name: text("name").notNull(),
  picture: text("picture"),
  isPublic: integer("is_public", { mode: "boolean" }).notNull().default(false),
})
