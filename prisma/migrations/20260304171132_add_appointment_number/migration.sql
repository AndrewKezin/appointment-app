/*
  Warnings:

  - A unique constraint covering the columns `[appointmentNumber]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "appointmentNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "appointments_appointmentNumber_key" ON "appointments"("appointmentNumber");
