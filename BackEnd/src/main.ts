import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for HTTP server
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(4000);
}

bootstrap();
