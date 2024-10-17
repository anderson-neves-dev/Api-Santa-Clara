import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { PacienteController } from './paciente.controller';
import { PacienteService } from './paciente.service';
import { PacienteProviders } from './entities/paciente.providers';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [PacienteController],
  providers: [...PacienteProviders, PacienteService],
})
export class PacienteModule {}
