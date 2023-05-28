import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { SigninDto, SignupDto } from './dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Res({ passthrough: true }) res: Response, @Body() dto: SigninDto) {
    return this.authService.signin(res, dto);
  }

  @Post('signup')
  signup(@Res({ passthrough: true }) res: Response, @Body() dto: SignupDto) {
    return this.authService.signup(res, dto);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  signout(@Res({ passthrough: true }) res) {
    return this.authService.signout(res);
  }
}
