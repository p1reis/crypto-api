export interface Balance {
  coin: Coin;
  value: number;
}

export enum Coin {
  BTC = 'BTC',       // Bitcoin
  ETH = 'ETH',       // Ethereum
  BNB = 'BNB',       // Binance Coin
  SOL = 'SOL',       // Solana
  XRP = 'XRP',       // Ripple
  DOGE = 'DOGE',     // Dogecoin
  LTC = 'LTC',       // Litecoin
}

export interface TransactionResult {
  status: string;
  message: string;
  date: Date;
}
