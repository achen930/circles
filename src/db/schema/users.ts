import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
  kindeId: text("kinde_id").unique().notNull(),
  displayName: text("display_name").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  profilePicture: text("profile_picture").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})
