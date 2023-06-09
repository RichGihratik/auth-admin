import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '@/database';
import { AuthModule } from '@/auth';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
