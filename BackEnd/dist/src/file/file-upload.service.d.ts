/// <reference types="multer" />
import { PrismaService } from '../prisma/prisma.service';
export declare class FileUploadService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    uploadFile(senderId: number, file: Express.Multer.File): Promise<{
        id: number;
        name: string;
        url: string;
        filePath: string;
        message_id: number;
        created_at: Date;
        updated_at: Date;
        bidFileId: number;
        serviceId: number;
        senderId: number;
        recipientId: number;
        jobFileId: number;
    } | {
        message: string;
        filename: string;
        filepath: string;
    }>;
}
