import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  specialty: string;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  constructor(init?: Partial<Exame>) {
    Object.assign(this, init);
  }
}
