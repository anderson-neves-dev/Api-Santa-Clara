import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreatePacienteDTO {
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsDate()
  data_nascimento: Date;
}
