-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "points" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "player1_id" TEXT NOT NULL,
    "score_p1" INTEGER NOT NULL DEFAULT 0,
    "player2_id" TEXT NOT NULL,
    "score_p2" INTEGER NOT NULL DEFAULT 0,
    "winner_id" TEXT,
    "loser_id" TEXT,
    "draws" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "match_player1_id_fkey" FOREIGN KEY ("player1_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_player2_id_fkey" FOREIGN KEY ("player2_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "match_loser_id_fkey" FOREIGN KEY ("loser_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_nickname_key" ON "user"("nickname");
