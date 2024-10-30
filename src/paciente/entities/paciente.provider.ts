import { DataSource } from 'typeorm';
import { Paciente } from './paciente.entity';

export const pacienteProviders = [
  {
    provide: 'PACIENTE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Paciente),
    inject: ['DATA_SOURCE'],
  },
];
