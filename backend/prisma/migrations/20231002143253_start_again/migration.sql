-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nickname" TEXT,
    "avatar" TEXT,
    "statusConnection" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "userHistoryId" TEXT NOT NULL,
    CONSTRAINT "users_userHistoryId_fkey" FOREIGN KEY ("userHistoryId") REFERENCES "users_history" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users_history" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "loses" INTEGER NOT NULL DEFAULT 0,
    "draws" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_userHistoryId_key" ON "users"("userHistoryId");
