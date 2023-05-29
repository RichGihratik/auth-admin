import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { User } from '@prisma/client';

import { TOKEN_COOKIE_KEY } from './const';
import { JwtPayload, RawJwt, isValidPayload } from './jwt.interface';

@Injectable()
export class JwtExtractorService {
  constructor(private jwt: JwtService) {}

  extractPayload(req: Request) {
    const jwt = this.extractJwt(req);

    if (!jwt)
      throw new InternalServerErrorException(
        'Jwt parsing has failed: Jwt token was not found (Be sure to use on protected route)',
      );

    const raw = this.jwt.decode(jwt);

    if (!isValidPayload(raw))
      throw new InternalServerErrorException(
        'Jwt parsing has failed: Jwt token has invalid payload (Be sure to use on protected route)',
      );

    return this.extractPayloadFromRaw(raw);
  }

  extractJwt(req: Request) {
    if (req.cookies && req.cookies[TOKEN_COOKIE_KEY])
      return req.cookies[TOKEN_COOKIE_KEY];
    else return null;
  }

  extractPayloadFromRaw(payload: RawJwt): JwtPayload {
    return {
      userId: payload.sub,
      name: payload.name,
      email: payload.email,
    };
  }

  async setTokenInCookie(user: User, res: Response) {
    const payload: RawJwt = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    const token = await this.jwt.signAsync(payload);

    if (!token)
      throw new InternalServerErrorException(
        'Something has gone wrong when signing jwt',
      );

    res.cookie(TOKEN_COOKIE_KEY, token, {
      httpOnly: true,
      //secure: true, // TODO: Do not forget to uncomment
      sameSite: 'strict',
    });
  }
}
