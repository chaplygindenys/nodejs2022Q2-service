import { forwardRef, Module } from '@nestjs/common';
import { FavsModule } from 'src/favorites/favs.module';
import { AlbumsController } from './albums/albums.controller';
import { AlbumsService } from './albums/albums.service';

@Module({
  imports: [forwardRef(() => FavsModule)],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
