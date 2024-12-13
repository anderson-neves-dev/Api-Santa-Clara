import { join } from 'path';
import { Column, Entity, JoinTable, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Exame } from './exame.entity';

@Entity('performed_exams')
export class PerformedExam {

    @PrimaryColumn()
    @OneToMany(() => Exame, (exame) => exame.performedExams) 
    @JoinTable({
      name: 'exame_performed_exams',
    joinColumn: {
        referencedColumnName: 'id',        
        name: 'exame_id',   
    }})
    exam: Exame;

    @Column({ type: 'varchar', length: 150 })
    LaboratoryResultUrl: string; 


}
