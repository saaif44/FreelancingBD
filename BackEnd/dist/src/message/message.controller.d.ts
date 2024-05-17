import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Request } from 'express';
import { AppGateway } from '../app.gateway';
export declare class MessageController {
    private readonly messageService;
    private readonly appGateway;
    constructor(messageService: MessageService, appGateway: AppGateway);
    createMessage(createMessageDto: CreateMessageDto, request: Request): Promise<{
        id: number;
        content: string;
        senderId: number;
        recipientId: number;
        created_at: Date;
        updated_at: Date;
        senderName: string;
        recipientName: string;
    }>;
    getSentMessages(request: Request): Promise<{
        id: number;
        content: string;
        senderId: number;
        recipientId: number;
        created_at: Date;
        updated_at: Date;
        senderName: string;
        recipientName: string;
    }[]>;
    getReceivedMessages(id: string): Promise<{
        id: number;
        content: string;
        senderId: number;
        recipientId: number;
        created_at: Date;
        updated_at: Date;
        senderName: string;
        recipientName: string;
    }[]>;
    getUsersReceived(request: Request): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        created_at: Date;
        updated_at: Date;
        role: import(".prisma/client").$Enums.RoleType;
        balance: import("@prisma/client/runtime/library").Decimal;
        language_known: string;
        nationality: string;
        address: string;
        phone_number: string;
        nid_number: string;
        avatarUrl: string;
    }[]>;
}
