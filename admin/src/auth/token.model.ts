import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface TokenCreationAttr {
  user_id: number;
  refreshToken:string;
}

@Table({ tableName: 'Tokens' })
export class Token extends Model<Token, TokenCreationAttr> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор пользователя' })
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  user_id: number;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp.eyJpZCI6MSwiZW1haWwiOiJydWh', description: 'Токен пользователя' })
  @Column({ type: DataType.STRING })
  refreshToken: string;
}
