import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import { logger } from './middlewares/logger.middleware';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';

async function bootstrap() {
  // const redisHost: string = configService.get('REDIS_HOST');
  // const redisPort: number = configService.get('REDIS_PORT');
  const redisClient = createClient({
    socket: {
      host: 'localhost',
      port: 6379,
    },
  });

  redisClient.connect().catch(console.error);
  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully', err);
  });
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/');
  const config = new DocumentBuilder()
    .setTitle('SprintUI-Experience API')
    .setDescription('The api for SprintUI')
    .setVersion('1.0')
    .addTag('sprintui')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, document);

  app.use(
    session({
      store: new RedisStore({ client: redisClient, prefix: 'mysession:' }),
      secret: 'my-secret',
      resave: true,
      saveUninitialized: false,
    }),
  );

  app.use(logger);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
