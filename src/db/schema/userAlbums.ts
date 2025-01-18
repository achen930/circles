import { integer, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core"
import { usersTable } from "./users"
import { albumsTable } from "./albums"

export const usersAlbumTable = sqliteTable(
  "userAlbum",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id),
    albumId: integer("album_id")
      .notNull()
      .references(() => albumsTable.id),
  },
  (usersAlbumTable) => {
    return {
      pk: primaryKey({
        columns: [usersAlbumTable.userId, usersAlbumTable.albumId],
      }),
      userAlbumId: primaryKey({
        name: "user_album_id",
        columns: [usersAlbumTable.userId, usersAlbumTable.albumId],
      }),
    }
  }
)
