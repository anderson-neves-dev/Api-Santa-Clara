import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsEmail } from 'class-validator';
import { UserType } from '../enums/user-type.enum';

export class UpdateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail({}, { message: 'Deve ser um email válido' })
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  senha?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(UserType, { message: 'Deve ser administrador ou funcionário' })
  tipo?: UserType;
}
