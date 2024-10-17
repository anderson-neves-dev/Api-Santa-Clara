import { Collection, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: '11', nullable: false })
  cpf: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  nome: string;

  @Column({ type: 'date', nullable: false })
  date_birthday: Date;

  constructor(partial: Partial<Paciente>) {
    Object.assign(this, partial);
  }
}
