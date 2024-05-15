import { TransactionService } from './transaction.service';
import { Transaction } from '@prisma/client';
import { DepositDto } from './dto/deposit.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    deposit(depositDto: DepositDto, req: any): Promise<Transaction>;
    getTransactionHistory(req: any): Promise<Transaction[]>;
}
