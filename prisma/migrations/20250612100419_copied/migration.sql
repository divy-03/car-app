/*
  Warnings:

  - The values [TRUCK,MINIVAN] on the enum `CarType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `Seats` on the `CarSpecification` table. All the data in the column will be lost.
  - The `status` column on the `TestDriveRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `CarSpecification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
BEGIN;
CREATE TYPE "CarType_new" AS ENUM ('SEDAN', 'SUV', 'HATCHBACK', 'COUPE', 'CONVERTIBLE', 'PICKUP', 'VAN', 'WAGON', 'CROSSOVER', 'SPORTS');
ALTER TABLE "Car" ALTER COLUMN "type" TYPE "CarType_new" USING ("type"::text::"CarType_new");
ALTER TYPE "CarType" RENAME TO "CarType_old";
ALTER TYPE "CarType_new" RENAME TO "CarType";
DROP TYPE "CarType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- AlterTable
ALTER TABLE "CarSpecification" DROP COLUMN "Seats",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "seats" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TestDriveRequest" DROP COLUMN "status",
ADD COLUMN     "status" "RequestStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "Authenticator";

-- DropTable
DROP TABLE "VerificationToken";

-- DropEnum
DROP TYPE "Status";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
