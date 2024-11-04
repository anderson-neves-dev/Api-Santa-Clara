import { UnprocessableEntityException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';
import { removeSpecialChars } from 'src/shareds/helpers';

export class CreatePacienteDTO {
  @ApiProperty({
    description: 'Paciente CPF',
    example: '123.456.789-00',
  })
  @IsNotEmpty({ message: 'Document number is required.' })
  @IsString({ message: 'Document number must be a string.' })
  @Transform(({ value }) => {
    const document = removeSpecialChars(value).replace(/\s+/g, '');
    console.log(document);
    if (document.length === 11) {
      if (!cpf.isValid(document)) {
        throw new UnprocessableEntityException('O CPF informado é inválido.');
      }
    } else {
      throw new UnprocessableEntityException(
        'O documento informado não é um CPF válido.',
      );
    }

    return 'ola';
  })
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value), { toClassOnly: true }) // Transformar string para Date
  @IsDate()
  data_nascimento: Date;

  @ApiProperty({ example: 'jon@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
