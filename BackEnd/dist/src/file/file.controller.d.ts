/// <reference types="multer" />
import { FileUploadService } from './file-upload.service';
import { Request } from 'express';
export declare class FileController {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadFile(file: Express.Multer.File, request: Request): Promise<{
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
    } | {
        message: string;
        filename: string;
        filepath: string;
    }>;
}
