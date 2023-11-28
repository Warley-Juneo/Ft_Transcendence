-- CreateTable
CREATE TABLE "_member_chatroom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_member_chatroom_A_fkey" FOREIGN KEY ("A") REFERENCES "chat_room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_member_chatroom_B_fkey" FOREIGN KEY ("B") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_member_chatroom_AB_unique" ON "_member_chatroom"("A", "B");

-- CreateIndex
CREATE INDEX "_member_chatroom_B_index" ON "_member_chatroom"("B");
