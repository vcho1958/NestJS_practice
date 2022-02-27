import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/constants';
import { DeepPartial, EntityRepository } from 'typeorm';
import { User } from '../../../entity/user.entity';
import { IUserRepository } from '../../../interface/IUserRepository';
import { MemoryRepository } from 'src/class/MemoryRepository';

@Injectable()
@EntityRepository(User)
export class UserMemoryRepository extends MemoryRepository<User> implements IUserRepository {
  constructor(){
    super();
  }

  async findByUsername(username: string): Promise<User>{
    return await this.Memory.find(user => user.username === username);
  };
  async findAllByRole(role: UserRole): Promise<User[]>{
    return await this.Memory.filter(user => user.role.includes(role));
  };

}
