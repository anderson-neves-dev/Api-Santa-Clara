import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePacienteDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  data_nascimento?: Date;
}
