import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from "./services/token.service";
import { UsersModule } from "../users/users.module";

@Module({
  providers: [AuthService, TokenService],
  controllers: [AuthController],
  imports: [UsersModule],
  exports: [
    AuthService,
    TokenService
  ]
})

export class AuthModule {}
