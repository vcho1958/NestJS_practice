import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from 'src/auth/enum/userRole.enum';
import * as bcrypt from 'bcrypt';
import { EntityClass } from 'src/class/EntityClass';

@Entity()
export class User extends EntityClass{
  
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
