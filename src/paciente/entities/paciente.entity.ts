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
  name: string;

  @Column({
    type: 'date',
  })
  dateBirthday: Date;

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
}
