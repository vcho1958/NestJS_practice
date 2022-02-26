import { UserInfoDto } from 'src/dto/userInfo.dto';
import { UserInformation } from '../user-info/entity/UserInformation';
import { IRepository } from './IRepository';

export interface IUserInfoRepository extends IRepository<UserInformation> {
  findByEmail(email: string): Promise<UserInformation>;
  findByPhone(phone: string): Promise<UserInformation>;
}
