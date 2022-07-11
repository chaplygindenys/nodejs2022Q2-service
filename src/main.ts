import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import PromiseOpenAPIObject from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const openAPIObject = await PromiseOpenAPIObject;
  SwaggerModule.setup('doc', app, openAPIObject);

  await app.listen(4000);
}
bootstrap();
