import { Injectable } from '@nestjs/common';
import { UserInfoDto } from 'src/dto/userInfo.dto';
import { UserRole } from 'src/auth/enum/userRole.enum';
import errors from 'src/exception';
import { CustomException } from 'src/exception/customException';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { IUserRepository } from '../../interface/IUserRepository';
const { DUPLICATE_USERNAME, DUPLICATE_EMAIL } = errors;


@Injectable()
export class userTypeOrmRepository extends Repository<User> implements IUserRepository{
  async findById(id: number): Promise<User> {
    return await this.findOne(id);
  }

  async findByUsername(username: string): Promise<User>{
    return await this.findOne({username});
  };

  async findAllByRole(role: UserRole): Promise<User[]>{
    return await this.find({role});
  };
}
