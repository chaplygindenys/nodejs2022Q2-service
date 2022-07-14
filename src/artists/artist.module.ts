import { forwardRef, Module } from '@nestjs/common';
import { FavsModule } from 'src/favorites/favs.module';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsService } from './artists/artists.service';

@Module({
  imports: [forwardRef(() => FavsModule)],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
