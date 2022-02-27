import { UserRole } from 'src/constants';
import { User } from '../entity/user.entity';
import { IRepository } from './IRepository';

export interface IUserRepository  extends IRepository<User>{
  findByUsername(username: string): Promise<User>;
  findAllByRole(role: UserRole): Promise<User[]>;
}
