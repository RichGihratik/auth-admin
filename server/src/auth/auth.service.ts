import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { hash, compare } from 'bcrypt';
import { User } from '@prisma/client';

import { DatabaseService } from '@/database';
import { SigninDto, SignupDto } from './dto';
import { TOKEN_COOKIE_KEY } from './const';
import { JwtPayload } from './payload.interface';

@Injectable()
export class AuthService {
  constructor(private db: DatabaseService, private jwt: JwtService) {}

  async signin(res: Response, dto: SigninDto) {
    const { email, password } = dto;

    const user = await this.db.user.findUnique({
      where: { email },
    });

    if (!user) throw new BadRequestException('Wrong credentials!');

    this.checkUserStatus(user);

    const compareResult = await this.comparePasswords(password, user.hash);

    if (!compareResult) throw new BadRequestException('Wrong credentials!');

    await this.setTokenInCookie(user, res);

    await this.updateLogin(user.id);

    return { id: user.id, name: user.name, email };
  }

  async signup(res: Response, dto: SignupDto) {
    const { name, email, password } = dto;

    let user = await this.db.user.findUnique({
      where: { email },
    });

    if (user) throw new BadRequestException('Email already exists!');

    const hash = await this.hashPassword(password);

    user = await this.db.user.create({ data: { name, email, hash } });

    await this.setTokenInCookie(user, res);

    return { id: user.id, name, email };
  }

  signout(res: Response) {
    res.clearCookie(TOKEN_COOKIE_KEY);
    return 'Logged out sucessfully';
  }

  async checkPayload(payload: JwtPayload) {
    const { userId: id } = payload;
    const user = await this.db.user.findUnique({ where: { id } });

    if (user)
      throw new UnauthorizedException('Token invalid, user was not found!');

    this.checkUserStatus(user);

    await this.updateLogin(id);
  }

  private checkUserStatus(user: User | undefined) {
    if (user.status === 'BLOCKED')
      throw new ForbiddenException('Account is blocked!');
  }

  private async setTokenInCookie(user: User, res: Response) {
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    const token = await this.jwt.signAsync(payload);

    if (!token) throw new ForbiddenException('Could not sign in');

    res.cookie(TOKEN_COOKIE_KEY, token, {
      httpOnly: true,
      //secure: true, // TODO: Do not forget to uncomment
      sameSite: 'strict',
    });
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
