import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({ description: 'CRM do médico' })
  @IsNotEmpty()
  @IsString()
  crm: string;

  @ApiProperty({ description: 'Nome do médico' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Telefone' })
  @IsNotEmpty()
  @IsString()
  telephone: string;

  @ApiProperty({ description: 'Email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
