/*
  Warnings:

  - A unique constraint covering the columns `[contact_number]` on the table `locum_profiles` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `speciality` on the `specialties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "specialties" DROP COLUMN "speciality",
ADD COLUMN     "speciality" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "locum_profiles_contact_number_key" ON "locum_profiles"("contact_number");
