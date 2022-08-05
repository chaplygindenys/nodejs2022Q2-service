import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoggerMiddleware } from './logger.middleware';
import { MyLogger } from './logger.service';

@Module({
  imports: [PrismaModule],
  providers: [LoggerMiddleware, MyLogger],
  exports: [LoggerMiddleware, MyLogger],
})
export class LoggerModule {}
