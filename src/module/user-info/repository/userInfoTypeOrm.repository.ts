import { Injectable } from '@nestjs/common';
import errors from 'src/exception';
import { EntityRepository, Repository } from 'typeorm';
import { UserInformation } from '../../../entity/UserInformation.entity';
import { IUserInfoRepository } from '../../../interface/IUserInfoRepository';


@Injectable()
@EntityRepository(UserInformation)
export class UserInfoTypeOrmRepository extends Repository<UserInformation> implements IUserInfoRepository{
  findOneById(id: number): Promise<UserInformation> {
    return this.findOne(id);
  }

  findByEmail(email: string): Promise<UserInformation>{
    return this.findOne({email});
  };

  findByPhone(phone: string): Promise<UserInformation>{
    return this.findOne({phone});
  };
}
