import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';

import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SchedulingService } from './scheduling.service';
import { CreateSchedulingDTO } from './dto/create-scheduling.dto';
import { UpdateSchedulingDTO } from './dto/update-scheduling.dto';
import { CustomError } from 'src/shareds/errors';

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

  @Get('/countExamsByStatus')
  async countExamsByStatus() {
    return this.schedulingService.countExamsByStatus();
  }

  @Get('/getTopEnterprisesByScheduling')
  async getTopEnterprisesByScheduling() {
    return this.schedulingService.getTopEnterprisesByScheduling();
  }

  @Get('/getTop20Exams')
  async getTop20Exams() {
    return this.schedulingService.getTop20Exams();
  }

  @Get('/getSchedulingByDate/:date')
  async getSchedulingByDate(@Param('date') date: string) {
    const parsedDate = new Date(date); // Converte a string para uma data
    if (isNaN(parsedDate.getTime())) {
      throw new CustomError('Invalid date format');
    }

    // Chama o serviço passando a data ajustada
    return this.schedulingService.getSchedulingByDate(date);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.schedulingService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.schedulingService.findAll();
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScheduling: UpdateSchedulingDTO,
  ) {
    return this.schedulingService.update(id, updateScheduling);
  }

  @Patch('atualiza-comparecer/:id')
  atualizaComparecer(@Param('id', ParseIntPipe) id: number) {
    return this.schedulingService.atualizaComparecer(id);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.schedulingService.delete(id);
  }
}
