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
import { CustomError } from 'src/shareds/errors';
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
        throw new CustomError('The CPF is invalid.', 'cpf');
      }
    } else {
      throw new CustomError(
        'The document provided is not a valid CPF .',
        'cpf',
      );
    }

    return document;
  })
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value), { toClassOnly: true }) // Transformar string para Date
  @IsDate()
  dateBirthday: Date;

  @ApiProperty({ example: 'jon@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => removeSpecialChars(value).replace(/\s+/g, ''))
  @MaxLength(8)
  cep: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  complement: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  neighborhood: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  state: string;
}
