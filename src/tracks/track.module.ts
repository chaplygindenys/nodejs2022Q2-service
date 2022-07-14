import { forwardRef, Module } from '@nestjs/common';
import { FavsModule } from 'src/favorites/favs.module';
import { TracksController } from './tracks/tracks.controller';
import { TracksService } from './tracks/tracks.service';

@Module({
  imports: [forwardRef(() => FavsModule)],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
