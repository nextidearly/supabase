/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[avatar_url]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[twitter_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Tweet" ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "UserScore" ALTER COLUMN "created_at" SET DEFAULT now();

-- CreateTable
CREATE TABLE "Test" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "test" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_avatar_url_key" ON "User"("avatar_url");

-- CreateIndex
CREATE UNIQUE INDEX "User_twitter_id_key" ON "User"("twitter_id");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "Wallet"("address");
