import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user';
import { AuthModule } from './auth';

@Module({
  imports: [AuthModule, UserModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
