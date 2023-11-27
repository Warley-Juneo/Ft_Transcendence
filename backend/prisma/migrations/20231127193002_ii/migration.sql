-- CreateTable
CREATE TABLE "_banned_chatroom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_banned_chatroom_A_fkey" FOREIGN KEY ("A") REFERENCES "chat_room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_banned_chatroom_B_fkey" FOREIGN KEY ("B") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_banned_chatroom_AB_unique" ON "_banned_chatroom"("A", "B");

-- CreateIndex
CREATE INDEX "_banned_chatroom_B_index" ON "_banned_chatroom"("B");
