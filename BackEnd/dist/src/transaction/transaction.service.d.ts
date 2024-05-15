import { PrismaService } from '../prisma/prisma.service';
import { Transaction } from '@prisma/client';
import { DepositDto } from './dto/deposit.dto';
import { JwtService } from '@nestjs/jwt';
export declare class TransactionService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    deposit(userId: number, depositDto: DepositDto): Promise<Transaction>;
    getTransactionHistory(userId: number): Promise<Transaction[]>;
    private authenticateUser;
}
