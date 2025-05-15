import { Coin } from 'src/common/types';

export class Transaction {
  id: string;
  type: 'transfer' | 'deposit' | 'withdraw';
  from?: number;
  to: number;
  coin: Coin;
  amount: number;
  date: Date;
}
