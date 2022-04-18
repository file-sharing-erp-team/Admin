import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    readonly email: string;

    @ApiProperty({example: 'qwerty1234', description: 'Пароль'})
    readonly password: string;

    @ApiProperty({example: '0', description: 'Роль'})
    readonly role: number;

    @ApiProperty({example: 'Иван', description: 'Имя'})
    readonly first_name: string;

    @ApiProperty({example: 'Иванович', description: 'Отчество'})
    readonly middle_name: string;

    @ApiProperty({example: 'Иванов', description: 'Фамилия'})
    readonly last_name: string;
}
