import { Injectable } from '@nestjs/common';
import errors from 'src/exception';
import { Repository } from 'typeorm';
import { UserInformation } from '../entity/UserInformation';
import { IUserInfoRepository } from '../../interface/IUserInfoRepository';
const { DUPLICATE_USERNAME, DUPLICATE_EMAIL } = errors;


@Injectable()
export class userInfoTypeOrmRepository extends Repository<UserInformation> implements IUserInfoRepository{
  findById(id: number): Promise<UserInformation> {
    return this.findOne(id);
  }

  findByEmail(email: string): Promise<UserInformation>{
    return this.findOne({email});
  };

  findByPhone(phone: string): Promise<UserInformation>{
    return this.findOne({phone});
  };
}
