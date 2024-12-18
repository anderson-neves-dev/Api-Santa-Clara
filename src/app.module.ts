import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExameModule } from './exame/exame.module';
import { ConfigModule } from '@nestjs/config';
import { PacienteModule } from './paciente/paciente.module';
import { DoctorModule } from './doctor/doctor.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { SchedulingModule } from './agendamento/scheduling.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ExameModule,
    PacienteModule,
    DoctorModule,
    EnterpriseModule,
    SchedulingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
