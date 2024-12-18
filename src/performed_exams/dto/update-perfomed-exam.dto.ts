import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePerfomedExamDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_exam: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  laboratoryResultUrl: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  dataRealizacaoExameLaboratorial: Date;
}
