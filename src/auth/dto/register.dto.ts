import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  senha: string;

  @ApiProperty()
  tipo: string;
}
