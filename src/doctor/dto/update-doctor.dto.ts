import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDoctorDto {
  @ApiProperty({ description: 'CRM do médico' })
  @IsOptional()
  crm?: string;

  @ApiProperty({ description: 'Nome do médico' })
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Telefone' })
  @IsOptional()
  telephone?: string;

  @ApiProperty({ description: 'Email' })
  @IsOptional()
  email?: string;
}
