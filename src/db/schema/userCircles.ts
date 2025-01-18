import { integer, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core"
import { usersTable } from "./users"
import { circlesTable } from "./circles"

export const userCirclesTable = sqliteTable(
  "userCircle",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    circleId: integer("circle_id")
      .notNull()
      .references(() => circlesTable.id, { onDelete: "cascade" }),
    mod: integer("mod", { mode: "boolean" }).notNull().default(false),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.circleId] }),
      userCircleId: primaryKey({
        name: "user_circle_id",
        columns: [table.userId, table.circleId],
      }),
    }
  }
)
