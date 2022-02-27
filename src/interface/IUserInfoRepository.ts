import { UserInformation } from '../entity/UserInformation.entity';
import { IRepository } from './IRepository';

export interface IUserInfoRepository extends IRepository<UserInformation> {
  findByEmail(email: string): Promise<UserInformation>;
  findByPhone(phone: string): Promise<UserInformation>;
}
