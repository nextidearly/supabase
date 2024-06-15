/*
  Warnings:

  - You are about to drop the `Campaign` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CampaignFollowAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CampaignRetweet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CampaignUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tweet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserScore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_project_id_fkey";

-- DropForeignKey
ALTER TABLE "CampaignFollowAccount" DROP CONSTRAINT "CampaignFollowAccount_campaign_id_fkey";

-- DropForeignKey
ALTER TABLE "CampaignRetweet" DROP CONSTRAINT "CampaignRetweet_campaign_id_fkey";

-- DropForeignKey
ALTER TABLE "CampaignUser" DROP CONSTRAINT "CampaignUser_campaign_id_fkey";

-- DropForeignKey
ALTER TABLE "CampaignUser" DROP CONSTRAINT "CampaignUser_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CampaignUser" DROP CONSTRAINT "CampaignUser_wallet_id_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_invitee_id_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_referrer_id_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_campaign_id_fkey";

-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserScore" DROP CONSTRAINT "UserScore_campaign_id_fkey";

-- DropForeignKey
ALTER TABLE "UserScore" DROP CONSTRAINT "UserScore_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_user_id_fkey";

-- DropTable
DROP TABLE "Campaign";

-- DropTable
DROP TABLE "CampaignFollowAccount";

-- DropTable
DROP TABLE "CampaignRetweet";

-- DropTable
DROP TABLE "CampaignUser";

-- DropTable
DROP TABLE "Invite";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Test";

-- DropTable
DROP TABLE "Tweet";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserScore";

-- DropTable
DROP TABLE "Wallet";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "twitter_id" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "admin_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "reward_blockchain" TEXT NOT NULL,
    "reward_contract_address" TEXT NOT NULL,
    "reward_amount" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL,
    "reward_ticker" TEXT NOT NULL,
    "reward_decimals" INTEGER NOT NULL,
    "logo_url" TEXT NOT NULL,
    "cover_image_url" TEXT NOT NULL,
    "min_participation_amount" INTEGER NOT NULL,
    "min_participation_contract" TEXT NOT NULL,
    "min_participation_condition" BOOLEAN NOT NULL,
    "min_participation_contract_symbol" TEXT NOT NULL,
    "min_participation_contract_decimals" INTEGER NOT NULL,
    "points" JSONB NOT NULL,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "owner_id" UUID NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tweets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "retweet_count" INTEGER NOT NULL,
    "reply_count" INTEGER NOT NULL,
    "like_count" INTEGER NOT NULL,
    "quote_count" INTEGER NOT NULL,
    "bookmark_count" INTEGER NOT NULL,
    "impression_count" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "tweet_id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "tweets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_retweets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "campaign_id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "campaign_retweets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "address" TEXT NOT NULL,
    "blockchain" TEXT NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_scores" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "user_id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "score" INTEGER NOT NULL,
    "campaign_user_id" UUID NOT NULL,

    CONSTRAINT "user_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invites" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "referrer_id" UUID NOT NULL,
    "invitee_id" UUID NOT NULL,

    CONSTRAINT "invites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "wallet_id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "claimed_reward" BOOLEAN NOT NULL,
    "blacklisted" BOOLEAN NOT NULL,

    CONSTRAINT "campaign_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_follow_accounts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "campaign_id" UUID NOT NULL,
    "twitter_account" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "campaign_follow_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_claims" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "user_score_id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "users_claims_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_avatar_url_key" ON "users"("avatar_url");

-- CreateIndex
CREATE UNIQUE INDEX "users_twitter_id_key" ON "users"("twitter_id");

-- CreateIndex
CREATE UNIQUE INDEX "campaigns_slug_key" ON "campaigns"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_address_key" ON "wallets"("address");

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_retweets" ADD CONSTRAINT "campaign_retweets_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_scores" ADD CONSTRAINT "user_scores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_scores" ADD CONSTRAINT "user_scores_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_scores" ADD CONSTRAINT "user_scores_campaign_user_id_fkey" FOREIGN KEY ("campaign_user_id") REFERENCES "campaign_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_referrer_id_fkey" FOREIGN KEY ("referrer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_invitee_id_fkey" FOREIGN KEY ("invitee_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_users" ADD CONSTRAINT "campaign_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_users" ADD CONSTRAINT "campaign_users_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_users" ADD CONSTRAINT "campaign_users_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_follow_accounts" ADD CONSTRAINT "campaign_follow_accounts_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_claims" ADD CONSTRAINT "users_claims_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_claims" ADD CONSTRAINT "users_claims_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_claims" ADD CONSTRAINT "users_claims_user_score_id_fkey" FOREIGN KEY ("user_score_id") REFERENCES "user_scores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
