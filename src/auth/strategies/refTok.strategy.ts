import 'dotenv/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
type JwtPayload = {
  id: string;
  login: string;
};
@Injectable()
export class RefTokStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET_REFRESH_KEY,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('autorithation').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
