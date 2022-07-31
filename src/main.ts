import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import PromiseOpenAPIObject from './config/configuration';
import { ValidationPipe } from '@nestjs/common';
import { AccTokGuard } from './auth/common/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const pipes = [new ValidationPipe({ whitelist: true })];
  app.useGlobalPipes(...pipes);
  // const reflector = new Reflector();
  // app.useGlobalGuards(new AccTokGuard(reflector));
  const openAPIObject = await PromiseOpenAPIObject;
  SwaggerModule.setup('doc', app, openAPIObject);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
