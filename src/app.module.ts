import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { ExchangeModule } from './exchange/exchange.module';
import { RpcModule } from './rpc/rpc.module';

@Module({
  imports: [WalletModule, TransactionModule, ExchangeModule, RpcModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
