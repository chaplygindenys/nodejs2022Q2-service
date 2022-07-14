import { Module } from '@nestjs/common';
import { AlbumsModule } from './albums/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artist.module';
import { FavsModule } from './favorites/favs.module';
import { TracksModule } from './tracks/track.module';
import { UserController } from './user/user/user.controller';
import { UserService } from './user/user/user.service';

@Module({
  imports: [FavsModule, AlbumsModule, ArtistsModule, TracksModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
