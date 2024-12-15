import { DataSource } from 'typeorm';
import { Scheduling } from './scheduling.entity';

export const schedulingProviders = [
  {
    provide: 'SCHEDULING_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Scheduling),
    inject: ['DATA_SOURCE'],
  },
];
