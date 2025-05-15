export interface Balance {
  coin: Coin;
  value: number;
}

export enum Coin {
  BTC = 'BTC',
  ETH = 'ETH',
  BRL = 'BRL',
  DOL = 'DOL',
  EUR = 'EUR',
}

export interface TransactionResult {
  status: string;
  message: string;
  date: Date;
}
