import { integer, sqliteTable } from "drizzle-orm/sqlite-core"
import { usersTable } from "./users"

export const friendRequestsTable = sqliteTable("friendRequests", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
  requesterId: integer("requester_id")
    .notNull()
    .references(() => usersTable.id),
  requesteeId: integer("requestee_id")
    .notNull()
    .references(() => usersTable.id),
})
