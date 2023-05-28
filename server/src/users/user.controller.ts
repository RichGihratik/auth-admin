import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@/auth';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtGuard)
  getAll() {
    return this.userService.getAll();
  }
}
