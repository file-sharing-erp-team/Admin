import {ApiProperty} from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
  readonly email: string;

  @ApiProperty({example: 'qwerty1234', description: 'Пароль'})
  readonly password: string;
}
