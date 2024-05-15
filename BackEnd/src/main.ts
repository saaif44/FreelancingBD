import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import * as cors from 'cors';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());

  app.use(new LoggingMiddleware().use)
  await app.listen(4000);
}
bootstrap();
