import { IsOptional, IsString } from 'class-validator';

export class UpdatePacienteDTO {
  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  data_nascimento?: Date;
}
