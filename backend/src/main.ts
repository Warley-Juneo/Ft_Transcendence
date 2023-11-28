import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './exceptions/prisma.exceptions';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    }));
  app.useGlobalFilters(new AllExceptionFilter())
  await app.listen(3000);
}
bootstrap();
