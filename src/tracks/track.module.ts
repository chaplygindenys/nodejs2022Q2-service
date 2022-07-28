import { forwardRef, Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/album.module';
import { ArtistsModule } from 'src/artists/artist.module';
import { FavsModule } from 'src/favorites/favs.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TracksController } from './tracks/tracks.controller';
import { TracksService } from './tracks/tracks.service';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => FavsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
  ],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
