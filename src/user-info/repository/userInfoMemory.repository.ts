import { Injectable } from '@nestjs/common';
import { UserInfoDto } from 'src/dto/userInfo.dto';
import { getRepository } from 'typeorm';
import { UserInformation } from '../entity/UserInformation';
import { IUserInfoRepository } from '../../interface/IUserInfoRepository';
@Injectable()
export class UserInfoMemoryRepository implements IUserInfoRepository {
  UserInformation: Array<UserInformation>;
  constructor() {
    this.UserInformation = [];
  }
  async find(condition:Object): Promise<UserInformation[]>{
    return this.UserInformation.filter(user => {
      for(let key in condition) {
        if (user[key] === condition[key])return true;
      }
      return false;
    });
  };

  async findOne(condition:Object): Promise<UserInformation>{
    return this.UserInformation.find(user => {
      for(let key in condition) {
        if (user[key] === condition[key])return true;
      }
      return false;
    });
  };
  
  async findById(id: number): Promise<UserInformation> {
    return this.UserInformation[id];
  }

  async findByEmail(email: string): Promise<UserInformation>{
    return this.UserInformation.find(user => user.email === email)
  };

  async findByPhone(phone: string): Promise<UserInformation>{
    return this.UserInformation.find(user => user.phone === phone);
  }


  async save(newUserInformation: UserInfoDto | UserInformation): Promise<UserInformation>{
    const userInformation = getRepository(UserInformation).create(newUserInformation);
    this.UserInformation.push(userInformation);
    return userInformation;
  }
  async remove(userInformation: UserInformation): Promise<UserInformation> {
    delete this.UserInformation[userInformation.id];
    return userInformation;
  }
}
