-- AddForeignKey
ALTER TABLE "public"."Conversation" ADD CONSTRAINT "Conversation_USER_ONE_ID_fkey" FOREIGN KEY ("USER_ONE_ID") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Conversation" ADD CONSTRAINT "Conversation_USER_TWO_ID_fkey" FOREIGN KEY ("USER_TWO_ID") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
