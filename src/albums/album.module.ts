import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { AlbumsController } from './albums/albums.controller';
import { AlbumsService } from './albums/albums.service';

@Module({
  imports: [PrismaModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
