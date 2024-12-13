import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PerformedExam } from './performed-exam.entity';

@Entity()
export class Exame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  specialty: string;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @ManyToOne(() => PerformedExam, (performedExams) => performedExams.exam)
  performedExams: PerformedExam[];  

  constructor(init?: Partial<Exame>) {
    Object.assign(this, init);
  }
}
