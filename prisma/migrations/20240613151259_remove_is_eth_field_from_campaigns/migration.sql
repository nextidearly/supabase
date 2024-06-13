/*
  Warnings:

  - You are about to drop the column `is_eth` on the `Campaign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "is_eth",
ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Tweet" ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "UserScore" ALTER COLUMN "created_at" SET DEFAULT now();
