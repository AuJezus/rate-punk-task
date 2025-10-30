-- CreateTable
CREATE TABLE "ReferralLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerEmail" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferralLink_ownerEmail_key" ON "ReferralLink"("ownerEmail");
