import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExameModule } from './exame/exame.module';
import { ExameController } from './exame/exame.controller';
import { ExameService } from './exame/exame.service';
import { ConfigModule } from '@nestjs/config';
import { PacienteModule } from './paciente/paciente.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ExameModule,
    PacienteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
