import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Sentry.init({
    dsn: 'https://aabcba7e9ada4ee3827164608b3442be@o476959.ingest.sentry.io/5736519',
    integrations: [new Sentry.Integrations.Http({ tracing: true })],
    tracesSampleRate: 1.0,
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
