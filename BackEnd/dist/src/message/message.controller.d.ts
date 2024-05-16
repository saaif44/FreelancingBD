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
}
