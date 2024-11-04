import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('paciente')
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'char',
    length: 11,
  })
  cpf: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  nome: string;

  @Column({
    type: 'date',
  })
  data_nascimento: Date;

  @Column({ type: 'varchar', length: 100 })
  email: string;
}
