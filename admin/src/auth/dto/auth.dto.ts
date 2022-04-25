import {ApiProperty} from '@nestjs/swagger';
import { Column, DataType } from "sequelize-typescript";
import { User } from "../../users/users.model";

export class AuthDto {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.isActivated = user.isActivated;
    this.role = user.role;
  }

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  readonly id: number;

  @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
  readonly email: string;

  @ApiProperty({ example: 'true', description: 'Статус активации' })
  @Column({ type: DataType.BOOLEAN, defaultValue: 0 })
  readonly isActivated: boolean;

  @ApiProperty({ example: '0', description: 'Роль' })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  readonly role: number;
}

