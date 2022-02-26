import { Injectable } from '@nestjs/common';
import { UserInfoDto } from 'src/dto/userInfo.dto';
import { DeepPartial, getRepository } from 'typeorm';
import { UserInformation } from '../entity/UserInformation';
import { IUserInfoRepository } from '../../interface/IUserInfoRepository';
import { MemoryRepository } from 'src/class/MemoryRepository';
@Injectable()
export class UserInfoMemoryRepository extends MemoryRepository<UserInformation> implements IUserInfoRepository {
  constructor() {
    super()
  }


  async findByEmail(email: string): Promise<UserInformation>{
    return this.Memory.find(user => user.email === email)
  };

  async findByPhone(phone: string): Promise<UserInformation>{
    return this.Memory.find(user => user.phone === phone);
  }


  async save(newEntity: UserInformation | DeepPartial<UserInformation>): Promise<UserInformation>{
    const entity = new UserInformation();
    for(const key in newEntity){
      entity[key] = newEntity[key];
    }
    entity.id = this.Memory.length;
    this.Memory.push(entity);
    return entity;
  }
}
