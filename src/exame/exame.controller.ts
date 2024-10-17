import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExameService } from './exame.service';
import { CreateExameDto } from './dto/create-exame.dto';
import { UpdateExameDto } from './dto/update-exame.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Exame')
@Controller('exame')
export class ExameController {
  constructor(private readonly exameService: ExameService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo exame' })
  @ApiBody({
    description: 'Dados de exame',
    type: CreateExameDto,
  })
  async create(@Body() createExameDto: CreateExameDto) {
    return this.exameService.create(createExameDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os exames',
  })
  BuscarTodos() {
    return this.exameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exameService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExameDto: UpdateExameDto) {
    return this.exameService.update(+id, updateExameDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.exameService.delete(+id);
  }
}
