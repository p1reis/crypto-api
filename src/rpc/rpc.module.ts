import { Module } from '@nestjs/common';
import { RpcService } from './services/rpc.service';

@Module({
  controllers: [RpcService],
})
export class RpcModule {}
