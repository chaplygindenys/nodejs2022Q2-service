import { Module } from '@nestjs/common';
import { AlbumsModule } from './albums/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artist.module';
import { FavsModule } from './favorites/favs.module';
import { TracksModule } from './tracks/track.module';
import { UserModule } from './user/user/user.module';

@Module({
  imports: [FavsModule, AlbumsModule, ArtistsModule, TracksModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
