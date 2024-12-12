import {
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';
import { CustomError } from 'src/shareds/errors';
import { removeSpecialChars } from 'src/shareds/helpers';

export class UpdatePacienteDTO {
  @ApiProperty({
    description: 'Paciente CPF',
    example: '123.456.789-00',
  })
  @IsOptional()
  @IsString({ message: 'Document number must be a string.' })
  @Transform(({ value }) => {
    try {
      if (!value) {
        return undefined; // Retorna undefined se o valor estiver vazio
      }
      const document = removeSpecialChars(value).replace(/\s+/g, '');
      if (document.length === 11) {
        if (!cpf.isValid(document)) {
          throw new CustomError('O CPF informado é inválido', 'cpf');
        }
      } else {
        throw new CustomError('O CPF precisa conter 11 dígitos', 'cpf');
      }
      return document;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  })
  cpf?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value ? value : undefined)) // Transforma string vazia para undefined
  name?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined), {
    toClassOnly: true,
  }) // Transforma string para Date ou undefined
  dateBirthday?: Date;

  @ApiProperty({ example: 'jon@gmail.com' })
  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => (value ? value : undefined))
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(11)
  @Transform(({ value }) => (value ? value : undefined)) // Transforma string vazia para undefined
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    value ? removeSpecialChars(value).replace(/\s+/g, '') : undefined,
  ) // Transforma string vazia para undefined
  @MaxLength(8)
  cep?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => (value ? value : undefined))
  street?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Transform(({ value }) => (value ? value : undefined))
  number?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => (value ? value : undefined))
  complement?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => (value ? value : undefined))
  neighborhood?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => (value ? value : undefined))
  city?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(2)
  @Transform(({ value }) => (value ? value : undefined))
  state?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id_enterprise?: number;
}
