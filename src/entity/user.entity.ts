import { BeforeUpdate, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from 'src/constants';
import * as bcrypt from 'bcrypt';
import { EntityClass } from 'src/class/EntityClass';
import { UserInformation } from './UserInformation.entity';

@Entity()
export class User extends EntityClass{
  
  @OneToOne(
    type => UserInformation,
    (userInformation: UserInformation) => userInformation.user
  )
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;

  @BeforeUpdate()
  hashPassword(){
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }
}
