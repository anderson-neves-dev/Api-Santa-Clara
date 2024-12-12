import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { EnterpriseController } from './enterprise.controller';
import { EnterpriseService } from './enterprise.service';
import { enterpriseProviders } from './entities/enterprise.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [EnterpriseController],
  providers: [...enterpriseProviders, EnterpriseService],
  exports: [EnterpriseService],
})
export class EnterpriseModule {}
