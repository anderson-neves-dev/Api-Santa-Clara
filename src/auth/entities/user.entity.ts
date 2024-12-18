import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserType } from '../enums/user-type.enum';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  tipo: UserType;
}
