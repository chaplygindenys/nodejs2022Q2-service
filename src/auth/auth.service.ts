import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async singup(dto: AuthDto): Promise<Tokens> {
    const hashPsw = await this.hashData(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        login: dto.login,
        hashPsw,
        version: 1,
        createdAt: +Date.now(),
        updatedAt: +Date.now(),
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.login);
    await this.updateRefHash(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async login(dto: AuthDto): Promise<Tokens> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { login: dto.login },
      });
      if (!user) throw 403;

      const passwordMatches = await bcrypt.compare(dto.password, user.hashPsw);
      if (!passwordMatches) throw 403;

      const tokens = await this.getTokens(user.id, user.login);
      await this.updateRefHash(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      if (error.message === 403) return null;
      console.log(error);
      return null;
    }
  }

  async refreshTokens(userId: string, refTok: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user || !user.hashRefTok) throw 403;

      const refTokMatches = await bcrypt.compare(refTok, user.hashRefTok);
      if (!refTokMatches) throw 403;

      const tokens = await this.getTokens(user.id, user.login);
      await this.updateRefHash(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      if (error.message === 403) return null;
      console.log(error);
      return null;
    }
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashRefTok: {
          not: null,
        },
      },
      data: {
        hashRefTok: null,
      },
    });
  }

  async hashData(data: string) {
    const salt: number = await +process.env.CRYPT_SALT;
    return await bcrypt.hash(data, salt);
  }
  async updateRefHash(userId: string, refTok: string) {
    const hash = await this.hashData(refTok);
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        hashRefTok: hash,
      },
    });
  }

  async getTokens(userId: string, login: string): Promise<Tokens> {
    const [accTok, refTok] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    ]);
    return {
      accessToken: accTok,
      refreshToken: refTok,
    };
  }
}
