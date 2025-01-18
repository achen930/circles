import { integer, sqliteTable } from "drizzle-orm/sqlite-core"
import { usersTable } from "./users"

export const friendsTable = sqliteTable("friends", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
  friendOneId: integer("friend_one_id")
    .notNull()
    .references(() => usersTable.id),
  friendTwoId: integer("friend_two_id")
    .notNull()
    .references(() => usersTable.id),
})
