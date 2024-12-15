import { Module } from '@nestjs/common';
import { PacienteController } from './paciente.controller';
import { PacienteService } from './paciente.service';
import { DatabaseModule } from 'src/database/database.module';
import { pacienteProviders } from './entities/paciente.provider';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';

@Module({
  imports: [DatabaseModule, EnterpriseModule],
  controllers: [PacienteController],
  providers: [...pacienteProviders, PacienteService],
  exports: [PacienteService], // Exporte o serviço para que outros módulos possam usá-lo
})
export class PacienteModule {}
