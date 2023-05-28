import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { JwtPayload } from './payload.interface';
import { TOKEN_COOKIE_KEY, CONFIG_JWT_KEY } from './const';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(cfg: ConfigService, private auth: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJwt]),
      secretOrKey: cfg.get<string>(CONFIG_JWT_KEY),
      ignoreExpiration: false,
    });
  }

  private static extractJwt(req: Request) {
    if (req.cookies && req.cookies[TOKEN_COOKIE_KEY])
      return req.cookies[TOKEN_COOKIE_KEY];
    else return null;
  }

  async validate(payload: any): Promise<JwtPayload> {
    const parsedPayload: JwtPayload = {
      userId: payload.sub,
      name: payload.name,
      email: payload.email,
    };

    await this.auth.checkPayload(parsedPayload);
    return parsedPayload;
  }
}
