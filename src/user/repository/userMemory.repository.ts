import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/auth/enum/userRole.enum';
import { User } from '../entity/user';

@Injectable()
export abstract class UserRepository {
  abstract findById(id: number): Promise<User>;
  abstract findByUsername(username: string): Promise<User>;
  abstract findAllByRole(role: UserRole): Promise<User[]>;
}
