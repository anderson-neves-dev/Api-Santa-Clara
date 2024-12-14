import { Doctor } from 'src/doctor/entites/doctor.entity';
import { Enterprise } from 'src/enterprise/entities/enterprise.entity';
import { PerformedExam } from 'src/performed_exams/entities/performed-exam.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Opinion } from 'src/shareds/enum/opinion.enum';
import { SchedulingStatus } from 'src/shareds/enum/scheduling-status.enum';
import { TypeExam } from 'src/shareds/enum/type-exam.enum';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('scheduling')
export class Scheduling {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  dataSolicitacao: Date;

  @Column({ type: 'date', nullable: true })
  dataAvaliacao: Date;

  @Column({ type: 'date', nullable: true })
  dataRealizacaoExame: Date;

  @Column({ type: 'date', nullable: true })
  dataAgendamento: Date;

  @Column({ type: 'varchar', length: 200, nullable: true })
  observacoes: string;

  @Column({ type: 'enum', enum: SchedulingStatus })
  status: SchedulingStatus;

  @Column({ type: 'enum', enum: TypeExam })
  tipoExame: TypeExam;

  @Column({ type: 'enum', enum: Opinion, nullable: true })
  parecer: Opinion;

  @ManyToOne(() => Paciente, (patient) => patient.scheduling, { cascade: true })
  @JoinColumn({
    name: 'id_patient',
    referencedColumnName: 'id',
  })
  patient: Paciente;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.scheduling, {
    cascade: true,
  })
  @JoinColumn({
    name: 'id_enterprise',
    referencedColumnName: 'id',
  })
  enterprise: Enterprise;

  @ManyToOne(() => Doctor, (doctor) => doctor.scheduling, {
    cascade: true,
  })
  @JoinColumn({
    name: 'id_doctor',
    referencedColumnName: 'id',
  })
  doctor: Doctor;

  @OneToMany(
    () => PerformedExam,
    (performedExams) => performedExams.scheduling,
    { cascade: true, nullable: true },
  )
  performedExams: PerformedExam[];
}
