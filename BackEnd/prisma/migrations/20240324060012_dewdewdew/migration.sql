-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
