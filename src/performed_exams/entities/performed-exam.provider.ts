import { DataSource } from 'typeorm';
import { PerformedExam } from './performed-exam.entity';

export const performedExamProviders = [
  {
    provide: 'PERFORMED_EXAM_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PerformedExam),
    inject: ['DATA_SOURCE'],
  },
];
