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

import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@ApiTags('Médico')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({ description: 'Cadastrar um novo médico' })
  @ApiBody({
    description: 'Dados do médico',
    type: CreateDoctorDto,
  })
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.doctorService.findOne(id);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDoctorDtp: UpdateDoctorDto,
  ) {
    return this.doctorService.update(id, updateDoctorDtp);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.doctorService.delete(id);
  }
}
