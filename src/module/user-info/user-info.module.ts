import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInformation } from '../../entity/UserInformation.entity';
import { UserInfoMemoryRepository } from './repository/userInfoMemory.repository';
import { UserInfoTypeOrmRepository } from './repository/userInfoTypeOrm.repository';
import { UserInfoService } from './user-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfoTypeOrmRepository])],
  providers: [UserInfoService, {
    provide: 'IUserInfoRepository',
    useClass: UserInfoTypeOrmRepository
  }],
  exports:[UserInfoService]

})
export class UserInfoModule {}
