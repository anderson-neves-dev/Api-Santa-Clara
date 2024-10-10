import { Module } from '@nestjs/common';
import { ExameService } from './exame.service';
import { ExameController } from './exame.controller';
import { exameProviders } from './entities/exame.providers';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [ExameController],
  providers: [...exameProviders, ExameService],
})
export class ExameModule {}
