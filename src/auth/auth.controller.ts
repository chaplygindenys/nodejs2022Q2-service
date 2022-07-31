import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { RefTokGuard } from './common/guards';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('singup')
  @HttpCode(HttpStatus.CREATED)
  async singup(@Body() dto: AuthDto): Promise<Tokens> {
    return await this.authService.singup(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDto): Promise<Tokens> {
    const user = await this.authService.login(dto);
    if (user === null) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: string) {
    await this.authService.logout(userId);
  }
  @Public()
  @UseGuards(RefTokGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId('id') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return await this.authService.refreshTokens(userId, refreshToken);
  }
}
