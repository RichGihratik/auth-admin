import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '@/database';

@Module({
  imports: [DatabaseModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}