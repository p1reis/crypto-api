import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { RpcModule } from './rpc/rpc.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(RpcModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 8877,
    },
  });

  await app.listen();
  Logger.log('✅ HTTP server is running on port 3000', 'RPC Server');
}

bootstrap();
