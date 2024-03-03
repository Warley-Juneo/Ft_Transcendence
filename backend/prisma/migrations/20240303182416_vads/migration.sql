-- CreateTable
CREATE TABLE "user" (
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
    "tfaOpen" BOOLEAN DEFAULT false,
    "socket" TEXT
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
    "draws" BOOLEAN DEFAULT false,
    CONSTRAINT "match_player1_id_fkey" FOREIGN KEY ("player1_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_player2_id_fkey" FOREIGN KEY ("player2_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "match_loser_id_fkey" FOREIGN KEY ("loser_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "direct_chat_room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "blocked_id" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "direct_chat_room_blocked_id_fkey" FOREIGN KEY ("blocked_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "direct_message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT,
    "img_url" TEXT,
    "user_id" TEXT NOT NULL,
    "direct_chat_room_name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "direct_message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "direct_message_direct_chat_room_name_fkey" FOREIGN KEY ("direct_chat_room_name") REFERENCES "direct_chat_room" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "chat_room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "photoUrl" TEXT,
    "type" TEXT NOT NULL DEFAULT 'public',
    "password" TEXT,
    "owner_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "chat_room_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kicked_chatroom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kicked_time" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "mutted_chatroom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mutted_time" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "img_url" TEXT,
    "user_id" TEXT NOT NULL,
    "chat_room_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "message_chat_room_id_fkey" FOREIGN KEY ("chat_room_id") REFERENCES "chat_room" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_friends" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_friends_A_fkey" FOREIGN KEY ("A") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_friends_B_fkey" FOREIGN KEY ("B") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_kicked_user" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_kicked_user_A_fkey" FOREIGN KEY ("A") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_kicked_user_B_fkey" FOREIGN KEY ("B") REFERENCES "kicked_chatroom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_mutted_user" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_mutted_user_A_fkey" FOREIGN KEY ("A") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_mutted_user_B_fkey" FOREIGN KEY ("B") REFERENCES "mutted_chatroom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_admin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_admin_A_fkey" FOREIGN KEY ("A") REFERENCES "chat_room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_admin_B_fkey" FOREIGN KEY ("B") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_member_chatroom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_member_chatroom_A_fkey" FOREIGN KEY ("A") REFERENCES "chat_room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_member_chatroom_B_fkey" FOREIGN KEY ("B") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_banned_chatroom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_banned_chatroom_A_fkey" FOREIGN KEY ("A") REFERENCES "chat_room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_banned_chatroom_B_fkey" FOREIGN KEY ("B") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_kicked_chatroom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_kicked_chatroom_A_fkey" FOREIGN KEY ("A") REFERENCES "chat_room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_kicked_chatroom_B_fkey" FOREIGN KEY ("B") REFERENCES "kicked_chatroom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_mutted_chatroom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_mutted_chatroom_A_fkey" FOREIGN KEY ("A") REFERENCES "chat_room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_mutted_chatroom_B_fkey" FOREIGN KEY ("B") REFERENCES "mutted_chatroom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_nickname_key" ON "user"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "user_socket_key" ON "user"("socket");

-- CreateIndex
CREATE UNIQUE INDEX "direct_chat_room_name_key" ON "direct_chat_room"("name");

-- CreateIndex
CREATE UNIQUE INDEX "chat_room_name_key" ON "chat_room"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_friends_AB_unique" ON "_friends"("A", "B");

-- CreateIndex
CREATE INDEX "_friends_B_index" ON "_friends"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_kicked_user_AB_unique" ON "_kicked_user"("A", "B");

-- CreateIndex
CREATE INDEX "_kicked_user_B_index" ON "_kicked_user"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_mutted_user_AB_unique" ON "_mutted_user"("A", "B");

-- CreateIndex
CREATE INDEX "_mutted_user_B_index" ON "_mutted_user"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_admin_AB_unique" ON "_admin"("A", "B");

-- CreateIndex
CREATE INDEX "_admin_B_index" ON "_admin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_member_chatroom_AB_unique" ON "_member_chatroom"("A", "B");

-- CreateIndex
CREATE INDEX "_member_chatroom_B_index" ON "_member_chatroom"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_banned_chatroom_AB_unique" ON "_banned_chatroom"("A", "B");

-- CreateIndex
CREATE INDEX "_banned_chatroom_B_index" ON "_banned_chatroom"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_kicked_chatroom_AB_unique" ON "_kicked_chatroom"("A", "B");

-- CreateIndex
CREATE INDEX "_kicked_chatroom_B_index" ON "_kicked_chatroom"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_mutted_chatroom_AB_unique" ON "_mutted_chatroom"("A", "B");

-- CreateIndex
CREATE INDEX "_mutted_chatroom_B_index" ON "_mutted_chatroom"("B");
