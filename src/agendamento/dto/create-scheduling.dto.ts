import {
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';
import { TypeExam } from 'src/shareds/enum/type-exam.enum';
import { CustomError } from 'src/shareds/errors';
import { removeSpecialChars } from 'src/shareds/helpers';

export class CreateSchedulingDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value), { toClassOnly: true }) // Transformar string para Date
  @IsDate()
  dataAgendamento: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TypeExam)
  tipoExame: TypeExam;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_patient: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_enterprise: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  exams: number[];
}
