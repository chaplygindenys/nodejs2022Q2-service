import { forwardRef, Module } from '@nestjs/common';
import { ArtistsModule } from 'src/artists/artist.module';
import { FavsModule } from 'src/favorites/favs.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TracksModule } from 'src/tracks/track.module';
import { AlbumsController } from './albums/albums.controller';
import { AlbumsService } from './albums/albums.service';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => FavsModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
