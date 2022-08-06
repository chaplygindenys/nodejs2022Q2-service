import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { FavsController } from './favs/favs.controller';
import { FavsService } from './favs/favs.service';

@Module({
  imports: [PrismaModule],
  controllers: [FavsController],
  providers: [FavsService],
  exports: [FavsService],
})
export class FavsModule {}
