import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { doctorProviders } from './entites/doctor.provider';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [DoctorController],
  providers: [...doctorProviders, DoctorService],
})
export class DoctorModule {}
