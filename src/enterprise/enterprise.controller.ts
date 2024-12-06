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
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDTO } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDTO } from './dto/update-enterprise';

@ApiTags('Enterprise')
@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post()
  @ApiOperation({ description: 'Cadastrar uma nova empresa' })
  @ApiBody({
    description: 'Dados da empresa',
    type: CreateEnterpriseDTO,
  })
  async create(@Body() createEnterpriseDTO: CreateEnterpriseDTO) {
    return this.enterpriseService.create(createEnterpriseDTO);
  }

  @Get()
  findAll() {
    return this.enterpriseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.enterpriseService.findOne(id);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEnterpriseDTO: UpdateEnterpriseDTO,
  ) {
    return this.enterpriseService.update(id, updateEnterpriseDTO);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.enterpriseService.delete(id);
  }
}
