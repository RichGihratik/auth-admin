import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { DatabaseModule } from '@/database';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CONFIG_JWT_KEY } from './const';
import { JwtStrategy } from './jwt.strategy';
import { JwtExtractorService } from './jwt-extractor.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: async (cfg: ConfigService) => ({
        secret: cfg.get<string>(CONFIG_JWT_KEY),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, JwtExtractorService],
  exports: [JwtExtractorService],
})
export class AuthModule {}
