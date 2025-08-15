/*
  Warnings:

  - A unique constraint covering the columns `[USER_ONE_ID,USER_TWO_ID]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conversation_USER_ONE_ID_USER_TWO_ID_key" ON "public"."Conversation"("USER_ONE_ID", "USER_TWO_ID");
