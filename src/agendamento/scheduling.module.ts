import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { PacienteModule } from 'src/paciente/paciente.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { ExameModule } from 'src/exame/exame.module';
import { schedulingProviders } from './entites/scheduling.provider';
import { SchedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { PerformedExamService } from 'src/performed_exams/perfomed-exam.service';
import { performedExamProviders } from 'src/performed_exams/entities/performed-exam.provider';

@Module({
  imports: [
    DatabaseModule,
    EnterpriseModule,
    PacienteModule,
    DoctorModule,
    ExameModule,
    DoctorModule,
  ],
  controllers: [SchedulingController],
  providers: [
    ...schedulingProviders,
    ...performedExamProviders,
    SchedulingService,
  ],
})
export class SchedulingModule {}
