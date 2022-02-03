import { Injectable } from '@nestjs/common';
import { UserInfoDto } from 'src/auth/dto/userInfo.dto';
import { UserRole } from 'src/auth/enum/userRole.enum';
import errors from 'src/exception';
import { CustomException } from 'src/exception/customException';
import { User } from '../entity/user';
const { DUPLICATE_USERNAME, USER_NOT_FOUND } = errors;
@Injectable()
export abstract class UserRepository {
  abstract findById(id: number): Promise<User>;
  abstract findByUsername(username: string): Promise<User>;
  abstract findAllByRole(role: UserRole): Promise<User[]>;
  abstract save(userInfoDto): Promise<User>;
  async createUser(userInfoDto: UserInfoDto): Promise<User>{
    const { username } = userInfoDto;
    if (await this.findByUsername(username)) throw new CustomException(DUPLICATE_USERNAME);
    return await this.save(userInfoDto);
  }
  async deleteUserById(id: number) {
    if (!await this.findById(id)) throw new CustomException(USER_NOT_FOUND);
  }

  async
}
