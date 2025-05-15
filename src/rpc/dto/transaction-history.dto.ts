import { Coin } from 'src/common/types';

export class TransactionHistoryDto {
  type: 'transfer' | 'deposit' | 'withdraw';
  from?: number;
  to: number;
  coin: Coin;
  amount: number;
  date: Date;
}
