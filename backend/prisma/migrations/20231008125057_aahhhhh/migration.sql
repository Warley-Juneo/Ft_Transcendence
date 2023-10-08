-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "player1_id" TEXT NOT NULL,
    "score_p1" INTEGER NOT NULL DEFAULT 0,
    "player2_id" TEXT NOT NULL,
    "score_p2" INTEGER NOT NULL DEFAULT 0,
    "winner_id" TEXT,
    "loser_id" TEXT,
    "draw" BOOLEAN NOT NULL,
    CONSTRAINT "Match_player1_id_fkey" FOREIGN KEY ("player1_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_player2_id_fkey" FOREIGN KEY ("player2_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Match_loser_id_fkey" FOREIGN KEY ("loser_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("draw", "id", "loser_id", "player1_id", "player2_id", "score_p1", "score_p2", "winner_id") SELECT "draw", "id", "loser_id", "player1_id", "player2_id", "score_p1", "score_p2", "winner_id" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
