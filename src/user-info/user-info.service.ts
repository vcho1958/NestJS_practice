import { Inject, Injectable } from '@nestjs/common';
import { CustomException } from 'src/exception/customException';
import { UserInformation } from './entity/UserInformation';
import { IUserInfoRepository } from '../interface/IUserInfoRepository';
import errors from '../exception';
import { UserInfoDto } from 'src/dto/userInfo.dto';
import { IUserRepository } from 'src/interface/IUserRepository';
const {USER_INFORMATION_NOT_FOUND, DUPLICATE_EMAIL, DUPLICATE_PHONE} = errors;
@Injectable()
export class UserInfoService {

  constructor( @Inject('IUserInfoRepository') private userInfoRepository: IUserInfoRepository){}
  
  async getUserInformation(id: number): Promise<UserInformation>{
    const user = await this.userInfoRepository.findById(id);
    if(!user)throw new CustomException(USER_INFORMATION_NOT_FOUND);
    return user;
  }

  async checkDuplicateOfUserInformation(userInfoDto: UserInfoDto): Promise<boolean>{
    const {email, phone} = userInfoDto;
    if(await this.userInfoRepository.findOne({email}))throw new CustomException(DUPLICATE_EMAIL);
    if(await this.userInfoRepository.findOne({phone}))throw new CustomException(DUPLICATE_PHONE);
    return true;
  }

  async createUserInformation(userInfoDto: UserInfoDto): Promise<UserInformation>{
    const {user, ...target} = userInfoDto;
    const createdUserInformation = await this.userInfoRepository.save(target);
    return await this.userInfoRepository.save(createdUserInformation);
  }

  async deleteUserInformation(id: number): Promise<UserInformation>{
    const userInfo = await this.userInfoRepository.findById(id);
    if(!userInfo)throw new CustomException(USER_INFORMATION_NOT_FOUND);
    return await this.userInfoRepository.remove(userInfo);
  }

  async updateUserInformation(id:number, modifiedUserInfo: UserInfoDto): Promise<UserInformation>{
    const user = await this.userInfoRepository.findById(id);
    if(!user)throw new CustomException(USER_INFORMATION_NOT_FOUND);
    return await this.userInfoRepository.save({...modifiedUserInfo, id:id});
  }

  async save(userInformation: UserInformation): Promise<UserInformation>{
    return this.userInfoRepository.save(userInformation);
  }


}
