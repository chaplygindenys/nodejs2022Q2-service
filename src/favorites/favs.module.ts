import { forwardRef, Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/album.module';
import { ArtistsModule } from 'src/artists/artist.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TracksModule } from 'src/tracks/track.module';
import { FavsController } from './favs/favs.controller';
import { FavsService } from './favs/favs.service';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
  ],
  controllers: [FavsController],
  providers: [FavsService],
  exports: [FavsService],
})
export class FavsModule {}
