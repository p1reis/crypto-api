import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { RpcModule } from './rpc/rpc.module';

@Module({
  imports: [WalletModule, TransactionModule, RpcModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
