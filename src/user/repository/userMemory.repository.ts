import { Injectable } from '@nestjs/common';
import { UserInfoDto } from 'src/auth/dto/userInfo.dto';
import { UserRole } from 'src/auth/enum/userRole.enum';
import { CustomException } from 'src/exception/customException';
import { User } from '../entity/user';
import { UserRepository } from './user.repository';
import errors from '../../exception/index';
const { DUPLICATE_USERNAME } = errors;
@Injectable()
export class UserMemoryRepository extends UserRepository {
  User: Array<User>;
  constructor() {
    super();
    this.User = [];
  }
  findById(id: number): Promise<User> {
    return new Promise<User>((resolve, reject) => resolve(this.User[id]))
  }

  findByUsername(username: string): Promise<User>{
    return new Promise<User>((resolve, reject) => resolve(this.User.find(user => user.username === username)));
  };
  findAllByRole(role: UserRole): Promise<User[]>{
    return new Promise<User[]>((resolve, reject) => resolve(this.User.filter(user => user.role === role)));
  };
  async save(userInfoDto: UserInfoDto): Promise<User>{
    const result = await this.findByUsername(userInfoDto.username);
    this.User.push({...userInfoDto, id: this.User.length});
    return this.User[-1];
  }
}
