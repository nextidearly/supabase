-- DropIndex
DROP INDEX "Project_slug_key";

-- DropIndex
DROP INDEX "User_avatar_url_key";

-- DropIndex
DROP INDEX "User_twitter_id_key";

-- DropIndex
DROP INDEX "User_user_name_key";

-- DropIndex
DROP INDEX "Wallet_address_key";

-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Tweet" ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "UserScore" ALTER COLUMN "created_at" SET DEFAULT now();
