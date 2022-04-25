import {Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from "../dto/login-user.dto";
import {AuthDto} from "../dto/auth.dto";
import bcrypt from "bcrypt"
import {TokenService} from "./token.service";
import { UsersService } from "../../users/users.service";
import { User } from "../../users/users.model";

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private tokenService: TokenService
  ) {}

  async login(dto: LoginUserDto) {
    const authDto = await this.validateUser(dto)
    const tokens = this.tokenService.generateToken(authDto)
    await this.tokenService.saveToken(authDto.id, tokens.refreshToken)
    return {tokens, authDto};
  }

  async logout(refreshToken) {
    await this.tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if(!refreshToken) {
      throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    }
    const userData:any = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if(!userData || !tokenFromDb) {
      throw new UnauthorizedException()
    }
    const user = await User.findByPk(userData.id);
    const authDTO = new AuthDto(user)
    const tokens = this.tokenService.generateToken({...authDTO});
    await this.tokenService.saveToken(authDTO.id, tokens.refreshToken);
    return {tokens, user:authDTO};
  }

  private async validateUser(loginDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    const passwordEquals = await bcrypt.compare(loginDto.password, user.password);
    if (user.role == 4 && passwordEquals) {
      return new AuthDto(user)
    }
    throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
  }

}
