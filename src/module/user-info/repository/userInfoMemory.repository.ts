import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { UserInformation } from '../../../entity/UserInformation.entity';
import { IUserInfoRepository } from '../../../interface/IUserInfoRepository';
import { MemoryRepository } from 'src/class/MemoryRepository';

@Injectable()
@EntityRepository(UserInformation)
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
}
