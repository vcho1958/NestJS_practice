import { EntityClass } from 'src/class/EntityClass';
import { User } from 'src/user/entity/User';
import { Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export class UserInformation extends EntityClass{

  @OneToOne(
    type => User,
    (user:User) => user.id
  )
  user: User;

  @Column()
  phone: string;

  @Column()
  email: string;
}
