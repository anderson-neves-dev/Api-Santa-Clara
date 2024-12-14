import { Scheduling } from 'src/agendamento/entites/scheduling.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('enterprise')
export class Enterprise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'char',
    length: 14,
  })
  cnpj: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  legalName: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 11 })
  phoneNumber: string;

  @Column({ type: 'char', length: 8 })
  cep: string;

  @Column({ type: 'varchar', length: 100 })
  street: string;

  @Column({ type: 'varchar', length: 20 })
  number: string;

  @Column({ type: 'varchar', length: 100 })
  complement: string;

  @Column({ type: 'varchar', length: 100 })
  neighborhood: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 2 })
  state: string;

  @OneToMany(() => Paciente, (patient) => patient.enterprise)
  patient: Paciente[];

  @OneToMany(() => Scheduling, (scheduling) => scheduling.enterprise)
  scheduling: Scheduling[];

  constructor(init?: Partial<Enterprise>) {
    Object.assign(this, init);
  }
}
