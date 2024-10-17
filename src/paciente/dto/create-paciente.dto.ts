import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreatePacienteDto {
  @ApiProperty({
    example: '000.000.000-00',
  })
  @IsNotEmpty({ message: 'Document number is required.' })
  @IsString({ message: 'Document number must be a string.' })
  cpf: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Document number is required.' })
  @IsString({ message: 'Document number must be a string.' })
  nome: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Document number is required.' })
  @IsDate({ message: 'Document number must be a string.' })
  date_birthday: Date;
}
