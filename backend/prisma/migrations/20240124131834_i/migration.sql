/*
  Warnings:

  - You are about to drop the column `kicked_time` on the `muttedChatroom` table. All the data in the column will be lost.
  - Added the required column `mutted_time` to the `muttedChatroom` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_muttedChatroom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mutted_time" DATETIME NOT NULL
);
INSERT INTO "new_muttedChatroom" ("id") SELECT "id" FROM "muttedChatroom";
DROP TABLE "muttedChatroom";
ALTER TABLE "new_muttedChatroom" RENAME TO "muttedChatroom";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
