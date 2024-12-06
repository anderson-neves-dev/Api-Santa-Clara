import {
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { CustomError } from 'src/shareds/errors';
import { removeSpecialChars } from 'src/shareds/helpers';

export class UpdateEnterpriseDTO {
  @ApiProperty({
    description: 'Enterprise CNPJ',
    example: '00.111.222/0000/00',
  })
  @IsOptional()
  @IsString({ message: 'CNPJ must be a string.' })
  @Transform(({ value }) => {
    try {
      if (!value) {
        return undefined; // Retorna undefined se o valor estiver vazio
      }
      const document = removeSpecialChars(value).replace(/\s+/g, '');
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
  cnpj?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value ? value : undefined)) // Transforma string vazia para undefined
  legalName?: string;

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
}
