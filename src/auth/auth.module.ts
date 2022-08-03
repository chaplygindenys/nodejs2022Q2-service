import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccTokStrategy, RefTokStrategy } from './strategies';

@Module({
  imports: [PrismaModule, JwtModule.register({})],

  controllers: [AuthController],

  providers: [AuthService, AccTokStrategy, RefTokStrategy],

  exports: [AuthService],
})
export class AuthModule {}
