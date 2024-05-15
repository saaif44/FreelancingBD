import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DepositDto } from './dto/deposit.dto';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('deposit')
  async deposit(
    @Body() depositDto: DepositDto,
    @Request() req, 
  ): Promise<Transaction> {
    const senderId = req.user.userId; 
    return this.transactionService.deposit(senderId, depositDto);
  }

  @Get('history')
  async getTransactionHistory(@Request() req): Promise<Transaction[]> {
    const senderId = req.user.userId; 
    return this.transactionService.getTransactionHistory(senderId);
  }
}
