import { EntityClass } from 'src/class/EntityClass';
import { User } from 'src/entity/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserInformation extends EntityClass{

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    (type) => User,
    (user:User) => user.id
  )
  @JoinColumn()
  user: User;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;
}
