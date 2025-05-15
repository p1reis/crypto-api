import { Coin, TransactionResult } from 'src/common/types';

export interface TransactionSummary {
  owner: string;
  currentBalance: Record<Coin, number>;
  transactionResult: TransactionResult;
}

export interface HistoryResponse {
  status: string;
  message: string;
  date: Date;
}
