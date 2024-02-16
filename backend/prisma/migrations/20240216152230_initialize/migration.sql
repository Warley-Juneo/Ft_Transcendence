-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "avatar" TEXT,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "points" INTEGER NOT NULL DEFAULT 0,
    "match_status" TEXT NOT NULL DEFAULT 'NONE',
    "tokenTFA" TEXT,
    "tfaOpen" BOOLEAN DEFAULT false
);
INSERT INTO "new_user" ("avatar", "coins", "createdAt", "email", "first_name", "id", "is_active", "last_name", "login", "nickname", "points", "tfaOpen", "tokenTFA", "updatedAt") SELECT "avatar", "coins", "createdAt", "email", "first_name", "id", "is_active", "last_name", "login", "nickname", "points", "tfaOpen", "tokenTFA", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE UNIQUE INDEX "user_nickname_key" ON "user"("nickname");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
