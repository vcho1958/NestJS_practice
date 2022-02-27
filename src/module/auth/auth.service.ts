import { Injectable } from '@nestjs/common';
import { UserInfoService } from 'src/module/user-info/user-info.service';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/module/user/user.service';
import errors from 'src/exception';
import { CustomException } from 'src/exception/customException';
import { Authentication } from 'src/class/Authentication';
import { UserInfoDto } from 'src/dto/userInfo.dto';
import { UserInformation } from 'src/entity/UserInformation.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from 'src/dto/token.dto';
const {WRONG_LOGIN_DATA} = errors;
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, 
    private userInfoService: UserInfoService,
    private jwtService: JwtService
    ){}
  
  async login(username: string, password: string): Promise<Authentication>{
    const user = await this.userService.getUserByUsername(username);
    if(!this.userService.comparePassword(password, user.password)) throw new CustomException(WRONG_LOGIN_DATA);
    const {password: userPassword, id, ...result} = user;
    const {id:userInfoId} = await this.userInfoService.getUserInformation({user});
    return {...result, userInfoId};
  }
  async getUser(user: Authentication){
    return await this.userService.getUserByUsername(user.username);
  }

  async getUserInformation(user: Authentication){
    const thisUser = this.getUser(user);
    return await this.userInfoService.getUserInformation({user:thisUser});
  }

  async signToken(user:Authentication): Promise<TokenDto>{
    return {
      accessToken: this.jwtService.sign(user),
      refreshToken: this.jwtService.sign({}),
    }
  }

  async changePassword(user: Authentication, currentPassword: string, newPassword: string): Promise<User>{
    const thisUser = await this.getUser(user);
    this.userService.comparePassword(currentPassword, thisUser.password);
    this.userService.updatePassword(thisUser, newPassword);
    return thisUser;
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
