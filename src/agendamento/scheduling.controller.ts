import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SchedulingService } from './scheduling.service';
import { CreateSchedulingDTO } from './dto/create-scheduling.dto';

@ApiTags('Scheduling')
@Controller('scheduling')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Post()
  @ApiOperation({ description: 'Marcar um novo agendamento' })
  @ApiBody({
    description: 'Dados do agendamento',
    type: CreateSchedulingDTO,
  })
  async create(@Body() createSchedulingDTO: CreateSchedulingDTO) {
    return this.schedulingService.create(createSchedulingDTO);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.schedulingService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.schedulingService.findAll();
  }
}
