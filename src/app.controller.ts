import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Hellou')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('Buscar')
  getHello(): string {
    return this.appService.getHello();
  }
}
