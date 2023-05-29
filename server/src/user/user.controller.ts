import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '@/auth';
import { UserService } from './user.service';
import { BlockUsersDto, DeleteUsersDto, UnblockUsersDto } from './dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtGuard)
  getCurrent(@Req() req) {
    return this.userService.getCurrent(req);
  }

  @Get('users')
  @UseGuards(JwtGuard)
  getAll() {
    return this.userService.getAll();
  }

  @Get('users/:id')
  @UseGuards(JwtGuard)
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @Delete('users/delete')
  @UseGuards(JwtGuard)
  deleteUsers(@Body() dto: DeleteUsersDto) {
    return this.userService.deleteUsers(dto);
  }

  @Patch('users/block')
  @UseGuards(JwtGuard)
  blockUsers(@Body() dto: BlockUsersDto) {
    return this.userService.blockUsers(dto);
  }

  @Patch('users/unblock')
  @UseGuards(JwtGuard)
  unblockUsers(@Body() dto: UnblockUsersDto) {
    return this.userService.unblockUsers(dto);
  }
}
