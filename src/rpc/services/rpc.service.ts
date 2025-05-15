import { randomUUID } from 'node:crypto';

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionHistoryDto } from '../dto/transaction-history.dto';
import { Transaction } from 'src/transaction/entity/transaction.entity';
import { TransactionResult } from 'src/common/types';

@Controller()
export class RpcService {
  @MessagePattern('test')
  handleTest(@Payload() data: any) {
    console.log('>>> Mensagem recebida no RPC:', data);
    return 'ok';
  }

  private readonly history: Transaction[] = [];

  @MessagePattern('register_transaction')
  registerTransaction(
    @Payload() transactionDto: TransactionHistoryDto,
  ): TransactionResult {
    const newTransaction: Transaction = {
      id: randomUUID(),
      ...transactionDto,
      date: new Date(transactionDto.date),
    };

    this.history.push(newTransaction);

    console.log('new transaction: ', newTransaction);
    return {
      status: 'success',
      message: `Transaction #${newTransaction.id} registered successfully`,
      date: newTransaction.date,
    };
  }

  @MessagePattern('get_wallet_history')
  getWalletHistory(
    @Payload() walletId: string,
  ): Transaction[] | { message: string } {
    const history = this.history.filter(
      (transaction) =>
        transaction.from?.toString() === walletId ||
        transaction.to?.toString() === walletId,
    );

    if (!history) {
      return { message: `There is no history for wallet ${walletId}` };
    }

    return history;
  }

  @MessagePattern('get_history')
  getHistory(): Transaction[] {
    return this.history;
  }
}
