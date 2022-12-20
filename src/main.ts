import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Initializer } from './init/initializer';
import { WINSTON_MODULE_PROVIDER, WinstonModule } from 'nest-winston';
import loggerConfig from '@utils/logger/logger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger(loggerConfig()),
  });

  const logger = app.get(WINSTON_MODULE_PROVIDER);

  const configService = app.get(ConfigService);

  const initializer = new Initializer(app, configService);

  app.use(json({ limit: '50mb' }));

  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  initializer.run();

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);

  logger.info(`App is listening on port ${PORT}`);
}
bootstrap();
