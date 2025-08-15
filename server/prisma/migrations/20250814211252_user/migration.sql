/*
  Warnings:

  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "bio" SET DEFAULT 'This is your Bio',
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT 'https://res.cloudinary.com/dhm82i8je/image/upload/v1755205884/Deafult_PFP___davy3k_chivjl.jpg',
ALTER COLUMN "displayName" SET DEFAULT 'User';
