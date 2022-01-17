import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/auth/enum/userRole.enum';
import { User } from './entity/user';

@Injectable()
export class UserService {
  getUser(id: number): Promise<User>;
  getUser(username: string): Promise<User>;
  getUsers(role: UserRole): Promise<User[]>;
  changePassword(newPassword: string): Promise<boolean>;
}