import { integer, sqliteTable } from "drizzle-orm/sqlite-core"
import { usersTable } from "./users"
import { circlesTable } from "./circles"

export const circleInvitesTable = sqliteTable("circleInvites", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  circleId: integer("circle_id")
    .notNull()
    .references(() => circlesTable.id),
})
