import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExameModule } from './exame/exame.module';
import { ExameController } from './exame/exame.controller';
import { ExameService } from './exame/exame.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ExameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
