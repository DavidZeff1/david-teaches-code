-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "cancelAt" TIMESTAMP(3),
ADD COLUMN     "canceled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subscribedAt" TIMESTAMP(3);
