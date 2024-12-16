import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePerfomedExamDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_exam: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  laboratoryResultUrl: string;
}
