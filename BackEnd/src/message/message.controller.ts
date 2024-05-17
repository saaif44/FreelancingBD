import { Controller, Get, Post, Param, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Request } from 'express';
import { AppGateway } from '../app.gateway'; // Import WebSocket gateway

interface DecodedToken {
    userId: number;
    // other properties if present in the token payload
}

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly appGateway: AppGateway, // Inject WebSocket gateway
  ) {}

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto, @Req() request: Request) {
    const decodedToken = request.user as DecodedToken;
    const senderId = decodedToken.userId;
    const message = await this.messageService.createMessage(senderId, createMessageDto);
    this.appGateway.sendMessage(message); // Send message to connected clients
    return message;
  }

  @Get('sent')
  async getSentMessages(@Req() request: Request) {
    const decodedToken = request.user as DecodedToken;
    const senderId = decodedToken.userId;
    return this.messageService.getMessagesBySenderId(senderId);
  }

  @Get(':id/received')
  async getReceivedMessages(@Param('id') id: string) {
    const recipientId = parseInt(id); // Parse ID string to number
    return this.messageService.getMessagesByRecipientId(recipientId);
  }

  // @Get('users')
  // async getUsersMessaged(@Req() request: Request) {
  //   const decodedToken = request.user as DecodedToken;
  //   const userId = decodedToken.userId;
  //   return this.messageService.getUsersMessagedByUserId(userId);
  // }
  @Get('received-users')
  async getUsersReceived(@Req() request: Request) {
    const decodedToken = request.user as DecodedToken;
    const userId = decodedToken.userId;
    return this.messageService.getUsersReceivedMessages(userId);
  }

}
