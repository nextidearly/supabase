-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "twitter_id" UUID NOT NULL,
    "verified" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "admin_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "hashtag" TEXT NOT NULL,
    "blockchain" TEXT NOT NULL,
    "contract_address" TEXT NOT NULL,
    "owner_address" TEXT NOT NULL,
    "reward_amount" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL,
    "is_eth" BOOLEAN NOT NULL,
    "ticker" TEXT NOT NULL,
    "decimals" INTEGER NOT NULL,
    "logo" TEXT NOT NULL,
    "is_fake" BOOLEAN NOT NULL,
    "min_participation_amount" TEXT NOT NULL,
    "min_participation_contract" TEXT NOT NULL,
    "onchain_participation_condition" BOOLEAN NOT NULL,
    "min_participation_contract_symbol" TEXT NOT NULL,
    "min_participation_contract_decimals" INTEGER NOT NULL,
    "points" JSONB NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "owner_id" UUID NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tweet" (
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
    "tweet_id" UUID NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignTweet" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "campaign_id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "CampaignTweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "address" TEXT NOT NULL,
    "blockchain" TEXT NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserScore" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "user_id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "UserScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invite" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "referrer_id" UUID NOT NULL,
    "invitee_id" UUID NOT NULL,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignUser" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "wallet_id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "claimed_reward" BOOLEAN NOT NULL,
    "blacklisted" BOOLEAN NOT NULL,

    CONSTRAINT "CampaignUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignFollowAccount" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "campaign_id" UUID NOT NULL,
    "twitter_account" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "CampaignFollowAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "Wallet"("address");

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignTweet" ADD CONSTRAINT "CampaignTweet_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserScore" ADD CONSTRAINT "UserScore_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserScore" ADD CONSTRAINT "UserScore_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_referrer_id_fkey" FOREIGN KEY ("referrer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_invitee_id_fkey" FOREIGN KEY ("invitee_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignUser" ADD CONSTRAINT "CampaignUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignUser" ADD CONSTRAINT "CampaignUser_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignUser" ADD CONSTRAINT "CampaignUser_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignFollowAccount" ADD CONSTRAINT "CampaignFollowAccount_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;