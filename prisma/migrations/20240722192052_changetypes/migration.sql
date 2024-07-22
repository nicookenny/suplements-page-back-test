-- DropIndex
DROP INDEX "User_password_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "code" TEXT,
ADD COLUMN     "verified" BOOLEAN DEFAULT false,
ALTER COLUMN "password" SET DATA TYPE TEXT;
