import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WalletModule } from 'src/wallet/wallet.module';
import { TransactionController } from './controller/transaction.controller';

@Module({
  imports: [
    WalletModule,
    ClientsModule.register([
      {
        name: 'RPC_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8877,
        },
      },
    ]),
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
