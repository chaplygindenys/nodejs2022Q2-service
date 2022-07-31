import { Module } from '@nestjs/common';
import { AlbumsModule } from './albums/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artist.module';
import { FavsModule } from './favorites/favs.module';
import { TracksModule } from './tracks/track.module';
import { UserModule } from './user/user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccTokGuard } from './auth/common/guards';

@Module({
  imports: [
    FavsModule,
    AlbumsModule,
    ArtistsModule,
    TracksModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccTokGuard,
    },
  ],
})
export class AppModule {}
