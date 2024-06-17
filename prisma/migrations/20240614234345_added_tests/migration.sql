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

-- CreateTable
CREATE TABLE "Test2" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "test" TEXT NOT NULL,

    CONSTRAINT "Test2_pkey" PRIMARY KEY ("id")
);
