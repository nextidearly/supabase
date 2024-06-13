/*
  Warnings:

  - You are about to drop the column `blockchain` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `contract_address` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `decimals` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `hashtag` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `is_fake` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `onchain_participation_condition` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `owner_address` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `ticker` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the `CampaignTweet` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cover_image_url` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keyword` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo_url` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_participation_condition` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reward_blockchain` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reward_contract_address` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reward_decimals` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reward_ticker` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `min_participation_amount` on the `Campaign` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CampaignTweet" DROP CONSTRAINT "CampaignTweet_campaign_id_fkey";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "blockchain",
DROP COLUMN "contract_address",
DROP COLUMN "decimals",
DROP COLUMN "hashtag",
DROP COLUMN "is_fake",
DROP COLUMN "logo",
DROP COLUMN "onchain_participation_condition",
DROP COLUMN "owner_address",
DROP COLUMN "ticker",
ADD COLUMN     "cover_image_url" TEXT NOT NULL,
ADD COLUMN     "keyword" TEXT NOT NULL,
ADD COLUMN     "logo_url" TEXT NOT NULL,
ADD COLUMN     "min_participation_condition" BOOLEAN NOT NULL,
ADD COLUMN     "reward_blockchain" TEXT NOT NULL,
ADD COLUMN     "reward_contract_address" TEXT NOT NULL,
ADD COLUMN     "reward_decimals" INTEGER NOT NULL,
ADD COLUMN     "reward_ticker" TEXT NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT now(),
DROP COLUMN "min_participation_amount",
ADD COLUMN     "min_participation_amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tweet" ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "UserScore" ALTER COLUMN "created_at" SET DEFAULT now();

-- DropTable
DROP TABLE "CampaignTweet";

-- CreateTable
CREATE TABLE "CampaignRetweet" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "campaign_id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "CampaignRetweet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- AddForeignKey
ALTER TABLE "CampaignRetweet" ADD CONSTRAINT "CampaignRetweet_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
