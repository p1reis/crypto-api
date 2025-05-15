import { IsString, IsObject, IsOptional } from 'class-validator';
import { Coin } from 'src/common/types';

export class CreateWalletDto {
  @IsString()
  owner: string;

  @IsOptional()
  @IsObject()
  balance?: Record<Coin, number>;

  @IsOptional()
  isActive: boolean = true;
}
