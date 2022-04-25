import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttr {
  email: string;
  password: string;
  role: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  activationLink: string;
}

@Table({ tableName: 'Users' })
export class User extends Model<User, UserCreationAttr> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '88005353535', description: 'Телефон' })
  @Column({ type: DataType.STRING })
  phone: string;

  @ApiProperty({ example: 'qwerty1234', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'Иван', description: 'Имя' })
  @Column({ type: DataType.STRING })
  first_name: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество' })
  @Column({ type: DataType.STRING })
  middle_name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @Column({ type: DataType.STRING })
  last_name: string;

  @ApiProperty({ example: '0', description: 'Роль' })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  role: number;

  @ApiProperty({
    example: 'f60e6810-be80-11ec-9d64-0242ac120002',
    description: 'Ссылка активации',
  })

  @Column({ type: DataType.STRING, allowNull: true })
  activationLink: string;

  @ApiProperty({ example: 'true', description: 'Статус активации' })
  @Column({ type: DataType.BOOLEAN, defaultValue: 0 })
  isActivated: boolean;
}
