import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateExameDto {
  @ApiProperty({
    description: 'Especialidade do exame ',
    example: 'Exame de sangue',
  })
  @IsNotEmpty({ message: 'Specialty is mandatory' })
  specialty: string;

  @ApiProperty({
    description: 'Categoria do exame ',
    example: 'Laboratorial',
  })
  @IsNotEmpty({ message: 'Category is mandatory' })
  category: string;
}
