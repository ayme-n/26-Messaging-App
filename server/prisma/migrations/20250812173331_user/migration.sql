-- AlterTable
ALTER TABLE "public"."Message" ADD COLUMN     "UserID" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
