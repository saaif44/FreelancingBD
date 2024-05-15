/*
  Warnings:

  - Made the column `name` on table `File` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `File` required. This step will fail if there are existing NULL values in that column.
  - Made the column `filePath` on table `File` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "File" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "url" SET NOT NULL,
ALTER COLUMN "filePath" SET NOT NULL;
