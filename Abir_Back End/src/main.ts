import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist : true,
    }
  ));
  app.enableCors({
    origin: '*', // Allow requests from your Next.js app
    methods: '*',
    credentials: true, // Enable credentials (if needed)
  });
  await app.listen(3000);
}
bootstrap();
