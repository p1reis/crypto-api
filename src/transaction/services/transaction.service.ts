import { firstValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Coin, TransactionResult } from '../../common/types';
import { WalletService } from '../../wallet/services/wallet.service';
import { HistoryResponse, TransactionSummary } from '../common/types';
import { Transaction } from '../entity/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    private walletService: WalletService,
    @Inject('RPC_CLIENT') private readonly client: ClientProxy,
  ) { }

  async onModuleInit() {
    await this.client.connect();
  }

  async deposit(
    id: string,
    body: { coin: Coin; amount: number },
  ): Promise<TransactionSummary> {
    const wallet = this.walletService.findOne(id);

    if (!wallet) {
      throw new Error('Wallet was not found');
    }

    if (!wallet.isActive) {
      throw new Error(`Wallet is not active. You can't deposit`);
    }

    wallet.balance[body.coin] = (wallet.balance[body.coin] || 0) + body.amount;

    let transactionResult: TransactionResult;
    try {
      transactionResult = await firstValueFrom(
        this.client.send('register_transaction', {
          type: 'deposit',
          to: id,
          coin: body.coin,
          amount: body.amount,
          date: new Date().toISOString(),
        }),
      );
    } catch (error) {
      transactionResult = {
        status: 'error',
        message: error.message || 'RPC error',
        date: new Date(),
      };
    }

    return {
      owner: wallet.owner,
      currentBalance: wallet.balance,
      transactionResult: transactionResult,
    };
  }

  async withdraw(
    id: string,
    body: { coin: Coin; amount: number },
  ): Promise<TransactionSummary> {
    const wallet = this.walletService.findOne(id);

    if (!wallet) {
      throw new Error('Wallet was not found');
    }

    if (!wallet.isActive) {
      throw new Error(`Wallet is not active. You can't make a withdraw`);
    }

    if ((wallet.balance[body.coin] || 0) < body.amount) {
      throw new Error('Insufficient balance');
    }

    wallet.balance[body.coin] -= body.amount;

    let transactionResult: TransactionResult;

    try {
      transactionResult = await firstValueFrom(
        this.client.send('register_transaction', {
          type: 'withdraw',
          from: id,
          coin: body.coin,
          amount: body.amount,
          date: new Date().toISOString(),
        }),
      );
    } catch (error) {
      transactionResult = {
        status: 'error',
        message: error.message || 'RPC error',
        date: new Date(),
      };
    }

    return {
      owner: wallet.owner,
      currentBalance: wallet.balance,
      transactionResult: transactionResult,
    };
  }

  async transfer(
    from: string,
    to: string,
    body: { coin: Coin; amount: number },
  ): Promise<TransactionSummary> {
    const sender = this.walletService.findOneOrNull(from);
    const receiver = this.walletService.findOneOrNull(to);

    if (!sender) {
      throw new Error('Sender wallet was not found');
    }

    if (!sender.isActive) {
      throw new Error(`Sender wallet is not active. You can't make a transfer`);
    }

    if (!receiver) {
      throw new Error('Receiver wallet was not found');
    }

    if (!receiver.isActive) {
      throw new Error(`Receiver wallet is not active. You can't receive a transfer`);
    }

    if (sender.balance[body.coin] < body.amount) {
      throw new Error('Insufficient balance');
    }

    sender.balance[body.coin] -= body.amount;
    receiver.balance[body.coin] =
      (receiver.balance[body.coin] || 0) + body.amount;

    let transactionResult: TransactionResult;

    try {
      transactionResult = await firstValueFrom(
        this.client.send<TransactionResult>('register_transaction', {
          type: 'transfer',
          from,
          to,
          coin: body.coin,
          amount: body.amount,
          date: new Date().toISOString(),
        }),
      );
    } catch (error) {
      transactionResult = {
        status: 'error',
        message: error.message || 'RPC error',
        date: new Date(),
      };
    }

    return {
      owner: sender.owner,
      currentBalance: sender.balance,
      transactionResult,
    };
  }

  async getHistory(): Promise<Transaction[] | HistoryResponse> {
    try {
      return await firstValueFrom(this.client.send('get_history', {}));
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'RPC error',
        date: new Date(),
      };
    }
  }
}
