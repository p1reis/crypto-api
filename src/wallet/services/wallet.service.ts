import { firstValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Wallet } from '../entity/wallet.entity';
import { CreateWalletDto } from '../dto/create-wallet-dto';
import { UpdateWalletDto } from '../dto/update-wallet-dto';
import { Coin } from 'src/common/types';
import { Transaction } from 'src/transaction/entity/transaction.entity';
import { HistoryResponse } from 'src/transaction/common/types';

@Injectable()
export class WalletService {
  constructor(@Inject('RPC_CLIENT') private readonly client: ClientProxy) {}

  async onModuleInit() {
    await this.client.connect();
  }
  private wallets: Wallet[] = [];
  private idCounter = 1;

  create(createWalletDto: CreateWalletDto): Wallet {
    const newWallet: Wallet = {
      id: this.idCounter++,
      owner: createWalletDto.owner,
      balance: createWalletDto.balance || this.getDefaultBalance(),
      isActive: createWalletDto.isActive ?? true,
      createdAt: new Date(),
    };
    this.wallets.push(newWallet);
    return newWallet;
  }

  findAll(): Wallet[] {
    return this.wallets;
  }

  findOne(id: string): Wallet {
    const wallet = this.wallets.find((wallet) => wallet.id === Number(id));

    if (!wallet) {
      throw new Error('Wallet was not found');
    }

    return wallet;
  }

  findOneOrNull(id: string): Wallet | null {
    return this.wallets.find((wallet) => wallet.id === Number(id)) ?? null;
  }

  getBalance(id: string): { owner: string; balance: Record<Coin, number> } {
    const wallet = this.wallets.find((wallet) => wallet.id === Number(id));

    if (!wallet) {
      throw new Error('Wallet was was not found');
    }

    return {
      owner: wallet.owner,
      balance: wallet.balance,
    };
  }

  update(id: string, updateWalletDto: UpdateWalletDto): Wallet {
    const wallet = this.findOne(id);
    wallet.owner = updateWalletDto.owner ?? wallet.owner;
    wallet.balance = updateWalletDto.balance ?? wallet.balance;
    wallet.isActive = updateWalletDto.isActive ?? wallet.isActive;
    wallet.updatedAt = new Date();
    return wallet;
  }

  disable(id: string): Wallet {
    const wallet = this.findOne(id);

    if (!wallet.isActive) {
      throw new Error('Wallet is already inactive');
    }

    wallet.isActive = false;
    wallet.updatedAt = new Date();

    return wallet;
  }

  private getDefaultBalance(): Record<Coin, number> {
    return {
      [Coin.BTC]: 0,
      [Coin.ETH]: 0,
      [Coin.BRL]: 0,
      [Coin.DOL]: 0,
      [Coin.EUR]: 0,
    };
  }

  async getHistory(id: string): Promise<Transaction[] | HistoryResponse> {
    try {
      return await firstValueFrom(this.client.send('get_wallet_history', id));
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'RPC error',
        date: new Date(),
      };
    }
  }
}
