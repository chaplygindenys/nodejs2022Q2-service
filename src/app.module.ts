import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AlbumsModule } from './albums/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artist.module';
import { FavsModule } from './favorites/favs.module';
import { TracksModule } from './tracks/track.module';
import { UserModule } from './user/user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AccTokGuard } from './auth/common/guards';
import { LoggerMiddleware } from './logger/logger.middleware';
import { HttpExceptionFilter } from './logger/http-exception.filter';

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
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
