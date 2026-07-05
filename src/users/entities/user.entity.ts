import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // ✅ Ajout du champ name (envoyé depuis le formulaire Register)
  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column({ default: 'client' })
  role: string;
}
