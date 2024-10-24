import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { CreatePacienteDTO } from './dto/create-paciente.dto';
import { UpdatePacienteDTO } from './dto/update-paciente.dto';
import { PacienteService } from './paciente.service';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Get()
  findAll() {
    return this.pacienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pacienteService.findOne(id);
  }

  @Post()
  async create(@Body() createPacienteDTO: CreatePacienteDTO) {
    return this.pacienteService.create(createPacienteDTO);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePacienteDTO: UpdatePacienteDTO,
  ) {
    return this.pacienteService.update(id, updatePacienteDTO);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.pacienteService.delete(id);
  }
}
