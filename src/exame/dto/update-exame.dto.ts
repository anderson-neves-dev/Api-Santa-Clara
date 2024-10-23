import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateExameDto } from './create-exame.dto';

export class UpdateExameDto {
  @ApiProperty({
    description: 'Especialidade do exame ',
    example: 'Exame de sangue',
  })
  specialty?: string;

  @ApiProperty({
    description: 'Categoria do exame ',
    example: 'Laboratorial',
  })
  category?: string;
}
