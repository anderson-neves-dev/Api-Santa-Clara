import { DataSource } from 'typeorm';
import { Enterprise } from './enterprise.entity';

export const enterpriseProviders = [
  {
    provide: 'ENTERPRISE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Enterprise),
    inject: ['DATA_SOURCE'],
  },
];
