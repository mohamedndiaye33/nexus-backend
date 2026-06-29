import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string; // Le mot de passe sera stocké sous forme de hash (bcrypt)

  @Column({ default: 'client' })
  role: string; // 'admin' ou 'client' (RBAC)
}