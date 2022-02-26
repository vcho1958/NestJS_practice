import { Injectable } from '@nestjs/common';
import { UserInfoService } from 'src/user-info/user-info.service';
import { User } from 'src/user/entity/User';
import { UserService } from 'src/user/user.service';
import errors from 'src/exception';
import { CustomException } from 'src/exception/customException';
import { Authentication } from 'src/class/Authentication';
import { UserInfoDto } from 'src/dto/userInfo.dto';
import { UserInformation } from 'src/user-info/entity/UserInformation';
import { LoginDataDto } from 'src/dto/loginData.dto';
const {WRONG_LOGIN_DATA} = errors;
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, 
    private userInfoService: UserInfoService
    ){}
  
  async validateUser(loginData:LoginDataDto): Promise<User>{
    const {username, password} = loginData;
    const user = await this.userService.getUserByUsername(username);
    if(!this.userService.comparePassword(password, user.password)) throw new CustomException(WRONG_LOGIN_DATA);
    return user;
  }

  async changePassword(user: Authentication<User>, currentPassword: string, newPassword: string): Promise<User>{
    const { sub:id } = user;
    const currentUser = await this.userService.getUserById(id);
    this.userService.comparePassword(currentPassword, currentUser.password);
    this.userService.updatePassword(currentUser, newPassword);
    return currentUser;
  }

  async join(userInfoDto: UserInfoDto): Promise<UserInformation>{
    const {user : {username}, user} = userInfoDto;
    await this.userService.checkDuplicateOfUsername(username);
    await this.userInfoService.checkDuplicateOfUserInformation(userInfoDto);
    const savedUserInformation = await this.userInfoService.createUserInformation(userInfoDto);
    const savedUser = await this.userService.createUser(user);
    savedUserInformation.user = savedUser;
    return await this.userInfoService.save(savedUserInformation);
  }
}
