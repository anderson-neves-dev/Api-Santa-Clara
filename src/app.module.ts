import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExameModule } from './exame/exame.module';
import { ExameController } from './exame/exame.controller';
import { ExameService } from './exame/exame.service';
import { ConfigModule } from '@nestjs/config';
import { PacienteModule } from './paciente/paciente.module';
import { DoctorModule } from './doctor/doctor.module';
import { EnterpriseModule } from './enterprise/enterprise.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ExameModule,
    PacienteModule,
    DoctorModule,
    EnterpriseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
