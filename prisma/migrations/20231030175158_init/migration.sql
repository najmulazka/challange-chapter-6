/*
  Warnings:

  - A unique constraint covering the columns `[fileId]` on the table `Arts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Arts_judul_key";

-- CreateIndex
CREATE UNIQUE INDEX "Arts_fileId_key" ON "Arts"("fileId");
