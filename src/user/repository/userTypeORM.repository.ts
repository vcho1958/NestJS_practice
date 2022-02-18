import { Injectable } from '@nestjs/common';
import { UserInfoDto } from 'src/auth/dto/userInfo.dto';
import { UserRole } from 'src/auth/enum/userRole.enum';
import errors from 'src/exception';
import { CustomException } from 'src/exception/customException';
import { Repository } from 'typeorm';
import { User } from '../entity/user';
import { UserRepository } from './user.repository';
const { DUPLICATE_USERNAME, DUPLICATE_EMAIL } = errors;


@Injectable()
export class userTypeORMRepository extends Repository<User> implements UserRepository{

  deleteUserById(id: number): Promise<Boolean> {
    throw new Error('Method not implemented.');
  }
  async: any;
  findById(id: number): Promise<User> {
    return this.findOne(id);
  }

  findByUsername(username: string): Promise<User>{
    return this.findOne({username: username});
  };

  findAllByRole(role: UserRole): Promise<User[]>{
    return this.find({role: role});
  };

  findByEmail(email: string): Promise<User>{
    return this.findOne({email: email});
  };

  async createUser(userInfoDto: UserInfoDto): Promise<User> {
    if (await this.findByUsername(userInfoDto.username)) throw new CustomException(DUPLICATE_USERNAME);
    if (await this.findByEmail(userInfoDto.email)) throw new CustomException(DUPLICATE_EMAIL);
    return this.save(userInfoDto);
  };
}
