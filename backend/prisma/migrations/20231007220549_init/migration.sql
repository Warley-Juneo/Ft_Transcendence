-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "player1_id" TEXT NOT NULL,
    "score_p1" INTEGER NOT NULL DEFAULT 0,
    "player2_id" TEXT NOT NULL,
    "score_p2" INTEGER NOT NULL DEFAULT 0,
    "winner_id" TEXT NOT NULL,
    "loser_id" TEXT NOT NULL,
    "draw" BOOLEAN NOT NULL,
    CONSTRAINT "Match_player1_id_fkey" FOREIGN KEY ("player1_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_player2_id_fkey" FOREIGN KEY ("player2_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_loser_id_fkey" FOREIGN KEY ("loser_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");
