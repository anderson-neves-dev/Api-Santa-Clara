import {
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UpdatePerfomedExamDTO } from 'src/performed_exams/dto/update-perfomed-exam.dto';
import { Opinion } from 'src/shareds/enum/opinion.enum';
import { SchedulingStatus } from 'src/shareds/enum/scheduling-status.enum';
import { TypeExam } from 'src/shareds/enum/type-exam.enum';

export class UpdateSchedulingDTO {
  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => (value ? value : undefined))
  @IsDate()
  dataAgendamento?: Date;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => (value ? value : undefined))
  @IsDate()
  dataAvaliacao?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value ? value : undefined))
  observacoes?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(SchedulingStatus)
  @Transform(({ value }) => (value ? value : undefined))
  status?: SchedulingStatus;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Opinion)
  @Transform(({ value }) => (value ? value : undefined))
  parecer?: Opinion;

  @IsOptional()
  @ApiProperty()
  @IsOptional()
  @IsEnum(TypeExam)
  @Transform(({ value }) => (value ? value : undefined))
  tipoExame?: TypeExam;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? value : undefined))
  id_patient?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? value : undefined))
  id_enterprise?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? value : undefined))
  id_doctor?: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (value ? value : undefined))
  exams?: number[];

  @ApiProperty({ type: [UpdatePerfomedExamDTO] })
  @IsOptional()
  @Transform(({ value }) => (value ? value : undefined))
  updatePerfomedExamDTO?: UpdatePerfomedExamDTO[];
}
