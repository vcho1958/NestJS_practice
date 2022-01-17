import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from 'src/auth/enum/userRole.enum';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  role: UserRole;
}
