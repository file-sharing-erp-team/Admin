import {Body, Controller, Get, Post, Request} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {LoginUserDto} from './dto/login-user.dto';
import {AuthService} from './services/auth.service';

@ApiTags('Авторизация')
@Controller('auth')

export class AuthController {

  constructor(private authService: AuthService) {
  }

  @ApiOperation({summary: 'Войти в учетную запись'})
  @ApiResponse({status: 200, type: User})
  @Post('login')
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({summary: 'Выйти из учетной записи'})
  @ApiResponse({status: 200})
  @Get('logout')
  logout(@Request() req) {
    const refreshToken = req.cookies
    return this.authService.logout(refreshToken);
  }

  @ApiOperation({summary: 'Refresh токена'})
  @ApiResponse({status: 200})
  @Get('refresh')
  refresh(@Request() req) {
    const refreshToken = req.cookies
    return this.authService.refresh(refreshToken);
  }
}


