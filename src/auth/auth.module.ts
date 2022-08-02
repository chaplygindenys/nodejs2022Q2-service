import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccTokStrategy, RefTokStrategy } from './strategies';

@Module({
  imports: [forwardRef(() => UserModule), PrismaModule, JwtModule.register({})],

  controllers: [AuthController],

  providers: [AuthService, AccTokStrategy, RefTokStrategy],

  exports: [AuthService],
})
export class AuthModule {}
