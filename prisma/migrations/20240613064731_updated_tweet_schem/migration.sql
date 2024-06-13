/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Campaign` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[avatar_url]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[twitter_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Tweet" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "tweet_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserScore" ALTER COLUMN "created_at" SET DEFAULT now();

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_slug_key" ON "Campaign"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_avatar_url_key" ON "User"("avatar_url");

-- CreateIndex
CREATE UNIQUE INDEX "User_twitter_id_key" ON "User"("twitter_id");
