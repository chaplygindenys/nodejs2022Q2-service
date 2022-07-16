import { forwardRef, Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/album.module';
import { FavsModule } from 'src/favorites/favs.module';
import { TracksModule } from 'src/tracks/track.module';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsService } from './artists/artists.service';

@Module({
  imports: [
    forwardRef(() => FavsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
