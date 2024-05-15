import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Transaction } from '@prisma/client';
import { DepositDto } from './dto/deposit.dto';
import { JwtService } from '@nestjs/jwt';




@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async deposit(userId: number, depositDto: DepositDto,): Promise<Transaction> {
    // user authenticate 

    const user = await this.authenticateUser(userId);
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Deposit
    const { amount } = depositDto;
    return this.prisma.transaction.create({
      data: {
        senderId: userId,
        receiverId: 0, 
        amount,
        type: 'deposit',
      },
    });
  }

  async getTransactionHistory(userId: number): Promise<Transaction[]> {
    // Verify user authentication
    const user = await this.authenticateUser(userId);
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Fetch transaction history
    return this.prisma.transaction.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
    });
  }

  private async authenticateUser(userId: number): Promise<any> {
    const payload = { userId };
    const token = this.jwtService.sign(payload);

    return { id: userId, username: 'authenticated_user' };
  }
}