-- CreateTable
CREATE TABLE "Arts" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "Arts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Arts_judul_key" ON "Arts"("judul");
