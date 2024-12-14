import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PerformedExam } from '../../performed_exams/entities/performed-exam.entity';

@Entity()
export class Exame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  specialty: string;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @OneToMany(() => PerformedExam, (performedExams) => performedExams.exam)
  performedExams: PerformedExam[];

  constructor(init?: Partial<Exame>) {
    Object.assign(this, init);
  }
}
