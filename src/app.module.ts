import { Module } from '@nestjs/common';
import { AlbumsController } from './albums/albums/albums.controller';
import { AlbumsService } from './albums/albums/albums.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists/artists.controller';
import { ArtistsService } from './artists/artists/artists.service';
import { FavoritesController } from './favorites/favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites/favorites.service';
import { TracksController } from './tracks/tracks/tracks.controller';
import { TracksService } from './tracks/tracks/tracks.service';
import { UserController } from './user/user/user.controller';
import { UserService } from './user/user/user.service';

@Module({
  imports: [
    /* the Module containing Array */
  ],
  controllers: [
    AppController,
    TracksController,
    UserController,
    ArtistsController,
    FavoritesController,
    AlbumsController,
  ],
  providers: [
    AppService,
    TracksService,
    UserService,
    ArtistsService,
    FavoritesService,
    AlbumsService,
  ],
})
export class AppModule {}
