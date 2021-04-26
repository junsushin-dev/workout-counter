import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import { AppModule } from './app.module';

async function bootstrap() {
  Sentry.init({
    dsn:
      'https://aabcba7e9ada4ee3827164608b3442be@o476959.ingest.sentry.io/5736519',
    tracesSampleRate: 1.0,
  });
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
