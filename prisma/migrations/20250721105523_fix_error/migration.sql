/*
  Warnings:

  - You are about to drop the column `reference_number1` on the `locum_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `reference_number2` on the `locum_profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "locum_profiles" DROP COLUMN "reference_number1",
DROP COLUMN "reference_number2",
ADD COLUMN     "referenceletter1" TEXT,
ADD COLUMN     "referenceletter2" TEXT;
