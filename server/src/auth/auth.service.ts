import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { hash, compare } from 'bcrypt';
import { User } from '@prisma/client';

import { DatabaseService } from '@/database';
import { SigninDto, SignupDto } from './dto';
import { TOKEN_COOKIE_KEY } from './const';
import { JwtPayload } from './jwt.interface';
import { JwtExtractorService } from './jwt-extractor.service';

@Injectable()
export class AuthService {
  constructor(private db: DatabaseService, private jwt: JwtExtractorService) {}

  async signin(res: Response, dto: SigninDto) {
    const { email, password } = dto;

    const user = await this.db.user.findUnique({
      where: { email },
    });

    if (!user) throw new BadRequestException('Wrong credentials!');

    this.checkUserStatus(user);

    const compareResult = await this.comparePasswords(password, user.hash);

    if (!compareResult) throw new BadRequestException('Wrong credentials!');

    await this.jwt.setTokenInCookie(user, res);

    await this.updateLogin(user.id);

    return 'Signed in successfully';
  }

  async signup(res: Response, dto: SignupDto) {
    const { name, email, password } = dto;

    let user = await this.db.user.findUnique({
      where: { email },
    });

    if (user) throw new BadRequestException('Email already exists!');

    const hash = await this.hashPassword(password);

    user = await this.db.user.create({ data: { name, email, hash } });

    await this.jwt.setTokenInCookie(user, res);

    return 'Signed un successfully';
  }

  signout(res: Response) {
    res.clearCookie(TOKEN_COOKIE_KEY);
    return 'Logged out sucessfully';
  }

  async checkPayload(payload: JwtPayload) {
    const { userId: id } = payload;
    const user = await this.db.user.findUnique({ where: { id } });

    if (!user)
      throw new UnauthorizedException('Token invalid, user was not found!');

    this.checkUserStatus(user);

    await this.updateLogin(id);
  }

  private checkUserStatus(user: User | undefined) {
    if (user.status === 'BLOCKED')
      throw new ForbiddenException('Account is blocked!');
  }

  private async hashPassword(password: string) {
    const saltRounds = 10;
    return await hash(password, saltRounds);
  }

  private async comparePasswords(password: string, hash: string) {
    return await compare(password, hash);
  }

  private async updateLogin(id: number) {
    await this.db.user.update({
      where: { id },
      data: {
        lastLogin: new Date(),
      },
    });
  }
}
