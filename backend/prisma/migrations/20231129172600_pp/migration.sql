-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_direct_message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT,
    "img_url" TEXT,
    "user_id" TEXT,
    "direct_chat_room_name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "direct_message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "direct_message_direct_chat_room_name_fkey" FOREIGN KEY ("direct_chat_room_name") REFERENCES "direct_chat_room" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_direct_message" ("content", "createdAt", "direct_chat_room_name", "id", "img_url", "user_id") SELECT "content", "createdAt", "direct_chat_room_name", "id", "img_url", "user_id" FROM "direct_message";
DROP TABLE "direct_message";
ALTER TABLE "new_direct_message" RENAME TO "direct_message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
