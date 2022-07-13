import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import PromiseOpenAPIObject from './config/configuration';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const pipes = [new ValidationPipe({ whitelist: true })];
  app.useGlobalPipes(...pipes);
  const openAPIObject = await PromiseOpenAPIObject;
  SwaggerModule.setup('doc', app, openAPIObject);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
