import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Exame } from '../../exame/entities/exame.entity';
import { Scheduling } from 'src/agendamento/entites/scheduling.entity';

@Entity('performed_exams')
export class PerformedExam {
  @PrimaryColumn()
  id_scheduling: number;

  @PrimaryColumn()
  id_exam: number;

  @Column({ type: 'date', nullable: true })
  dataRealizacaoExameLaboratorial: Date;

  @Column({ type: 'date', nullable: true })
  dataResultadoExameLaboratorial: Date;

  @ManyToOne(() => Scheduling, (scheduling) => scheduling.performedExams, {
    onDelete: 'CASCADE', // Adiciona comportamento de exclusão em cascata
    onUpdate: 'CASCADE', // Garante atualização em cascata
  })
  @JoinColumn({ name: 'id_scheduling' }) // Associa id_scheduling como chave estrangeira
  scheduling: Scheduling;

  @ManyToOne(() => Exame, (exame) => exame.performedExams)
  @JoinColumn({ name: 'id_exam' }) // Associa id_exam como chave estrangeira
  exam: Exame;

  @Column({ type: 'varchar', length: 150, nullable: true })
  laboratoryResultUrl: string; // Corrigido o nome para seguir o padrão camelCase

  constructor(init?: Partial<PerformedExam>) {
    Object.assign(this, init);
  }
}
