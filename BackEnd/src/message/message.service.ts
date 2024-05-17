import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from '@prisma/client'; 

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(senderId: number, createMessageDto: CreateMessageDto) {
    const { content, recipientId } = createMessageDto;

    //fetch sender and recipient usernames
    const [sender, recipient] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: senderId }, select: { username: true } }),
      this.prisma.user.findUnique({ where: { id: recipientId }, select: { username: true } }),
    ]);

    //check validator of sender and recipient
    if (!sender || !recipient) {
      throw new Error('Sender or recipient not found');
    }

    // Create the message with sender and recipient usernames
    return this.prisma.message.create({
      data: {
        content,
        senderId,
        recipientId,
        senderName: sender.username as string,
        recipientName: recipient.username as string,
      },
    });
  }

  // Method to fetch all messages sent by a specific sender
  async getMessagesBySenderId(senderId: number): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        senderId: senderId,
      },
    });
  }

  // Method to fetch all messages received by a specific recipient
  async getMessagesByRecipientId(recipientId: number): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        recipientId: recipientId,
      },
    });
  }

  // async getUsersMessagedByUserId(userId: number) {
  //   const sentMessages = await this.prisma.message.findMany({
  //     where: { senderId: userId },
  //     select: { recipientId: true },
  //   });

  //   const receivedMessages = await this.prisma.message.findMany({
  //     where: { recipientId: userId },
  //     select: { senderId: true },
  //   });

  //   const userIds = [
  //     ...new Set([
  //       ...sentMessages.map((message) => message.recipientId),
  //       ...receivedMessages.map((message) => message.senderId),
  //     ]),
  //   ];

  //   // Fetch user details based on user IDs
  //   const users = await this.prisma.user.findMany({
  //     where: { id: { in: userIds } },
  //   });

  //   return users;
  // }

  async getUsersReceivedMessages(userId: number) {
    const receivedMessages = await this.prisma.message.findMany({
      where: { senderId: userId },
      select: { recipientId: true },
    });

    const userIds = [
      ...new Set(receivedMessages.map((message) => message.recipientId)),
    ];

    // Fetch user details based on user IDs
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
    });

    return users;
  }

}
