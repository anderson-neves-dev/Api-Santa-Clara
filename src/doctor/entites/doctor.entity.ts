import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('doctor')
export class Doctor {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @PrimaryColumn()
  @Column({ type: 'varchar', length: 10 })
  crm: string;

  @Column({ type: 'char', length: 11 })
  telephone: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  constructor(init?: Partial<Doctor>) {
    Object.assign(this, init);
  }
}
