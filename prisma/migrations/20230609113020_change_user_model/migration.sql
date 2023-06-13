/*
  Warnings:

  - You are about to drop the column `auth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `endpoint` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `p256dh` on the `User` table. All the data in the column will be lost.
  - Added the required column `pushSubscription` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `auth`,
    DROP COLUMN `endpoint`,
    DROP COLUMN `p256dh`,
    ADD COLUMN `pushSubscription` JSON NOT NULL;
