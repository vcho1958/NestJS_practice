import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { UserInfoDto } from 'src/dto/userInfo.dto';
import { UserRole } from 'src/auth/enum/userRole.enum';
import { DeepPartial, getRepository } from 'typeorm';
import { User } from '../entity/User';
import { IUserRepository } from '../../interface/IUserRepository';
import { MemoryRepository } from 'src/class/MemoryRepository';
@Injectable()
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

  
  async save(newEntity: User | DeepPartial<User>): Promise<User>{
    const entity = new User();
    for(const key in newEntity){
      entity[key] = newEntity[key];
    }
    entity.id = this.Memory.length;
    this.Memory.push(entity);
    return entity;
  }

}
