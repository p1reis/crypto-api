import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ? +process.env.PORT : 3000);

  Logger.log('🚀 HTTP server is running on port 3000', 'Application');
}

bootstrap();
