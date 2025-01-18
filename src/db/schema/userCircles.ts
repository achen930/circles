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
  (userCirclesTable) => {
    return {
      id: primaryKey({
        name: "id",
        columns: [userCirclesTable.userId, userCirclesTable.circleId],
      }),
    }
  }
)
