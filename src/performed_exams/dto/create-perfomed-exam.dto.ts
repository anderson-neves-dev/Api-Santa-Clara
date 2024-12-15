import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePerfomedExamDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_exam: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_scheduling: number;
}
