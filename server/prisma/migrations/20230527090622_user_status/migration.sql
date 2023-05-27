/*
  Warnings:

  - You are about to drop the column `login` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('BLOCKED', 'ALIVE');

-- DropIndex
DROP INDEX "User_login_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "login",
DROP COLUMN "updatedAt",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "lastLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ALIVE';

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
