import { Coin } from 'src/common/types';

export class Wallet {
  id: number;
  owner: string;
  balance: Record<Coin, number>;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
