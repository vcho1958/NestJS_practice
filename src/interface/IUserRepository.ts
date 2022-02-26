import { UserRole } from 'src/auth/enum/userRole.enum';
import { User } from '../user/entity/User';
import { IRepository } from './IRepository';

export interface IUserRepository  extends IRepository<User>{
  findByUsername(username: string): Promise<User>;
  findAllByRole(role: UserRole): Promise<User[]>;
}
