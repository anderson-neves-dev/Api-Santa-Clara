import {
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { cnpj } from 'cpf-cnpj-validator';
import { CustomError } from 'src/shareds/errors';
import { removeSpecialChars } from 'src/shareds/helpers';

export class CreateEnterpriseDTO {
  @ApiProperty({
    description: 'Paciente CPF',
    example: '00.111.222/0000-11',
  })
  @IsNotEmpty({ message: 'CNPJ is required.' })
  @IsString({ message: 'CNPJ must be a string.' })
  @Transform(({ value }) => {
    try {
      const document = removeSpecialChars(value).replace(/\s+/g, '');
      console.log(document);
      if (document.length === 14) {
        if (!cnpj.isValid(document)) {
          throw new CustomError('O cnpj informado é inválido', 'cnpj');
        }
      } else {
        throw new CustomError('O cnpj precisa conter 14 dígitos', 'cnpj');
      }

      return document;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  })
  cnpj: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  legalName: string;

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
