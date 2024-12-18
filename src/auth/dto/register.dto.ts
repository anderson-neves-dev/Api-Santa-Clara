import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserType } from '../enums/user-type.enum';
import { User } from '../entities/user.entity';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  senha: string;

  @ApiProperty()
  @IsEnum(UserType, { message: 'Deve ser administrador ou funcionario' })
  tipo: UserType;
}
