import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateExameDto {
  @ApiProperty({
    description: 'Nome do exame ',
    example: 'Exame de bosta',
  })
  @IsNotEmpty({ message: 'Email address is mandatory' })
  especialidade: string;
}
