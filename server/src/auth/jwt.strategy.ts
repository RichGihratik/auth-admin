import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { JwtPayload, isValidPayload } from './jwt.interface';
import { CONFIG_JWT_KEY } from './const';
import { AuthService } from './auth.service';
import { JwtExtractorService } from './jwt-extractor.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    cfg: ConfigService,
    private jwt: JwtExtractorService,
    private auth: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([jwt.extractJwt]),
      secretOrKey: cfg.get<string>(CONFIG_JWT_KEY),
      ignoreExpiration: false,
    });
  }

  async validate(payload: unknown): Promise<JwtPayload> {
    if (!isValidPayload(payload))
      throw new UnauthorizedException('Token was invalid!');
    const parsed = this.jwt.extractPayloadFromRaw(payload);
    await this.auth.checkPayload(parsed);
    return parsed;
  }
}
