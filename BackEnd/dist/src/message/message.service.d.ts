import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from '@prisma/client';
export declare class MessageService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createMessage(senderId: number, createMessageDto: CreateMessageDto): Promise<{
        id: number;
        content: string;
        senderId: number;
        recipientId: number;
        created_at: Date;
        updated_at: Date;
        senderName: string;
        recipientName: string;
    }>;
    getMessagesBySenderId(senderId: number): Promise<Message[]>;
    getMessagesByRecipientId(recipientId: number): Promise<Message[]>;
}
