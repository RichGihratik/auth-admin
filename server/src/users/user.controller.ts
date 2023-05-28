import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '@/auth';
import { UserService } from './user.service';
import { BlockUsersDto, DeleteUsersDto, UnblockUsersDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtGuard)
  getAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @Delete('/delete')
  @UseGuards(JwtGuard)
  deleteUsers(@Body() dto: DeleteUsersDto) {
    return this.userService.deleteUsers(dto);
  }

  @Patch('/block')
  @UseGuards(JwtGuard)
  blockUsers(@Body() dto: BlockUsersDto) {
    return this.userService.blockUsers(dto);
  }

  @Patch('/unblock')
  @UseGuards(JwtGuard)
  unblockUsers(@Body() dto: UnblockUsersDto) {
    return this.userService.unblockUsers(dto);
  }
}
