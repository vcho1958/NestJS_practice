import { Module } from '@nestjs/common';
import { UserInfoMemoryRepository } from './repository/userInfoMemory.repository';
import { UserInfoService } from './user-info.service';

@Module({
  providers: [UserInfoService, {
    provide: 'IUserInfoRepository',
    useClass: UserInfoMemoryRepository
  }],
  exports:[UserInfoService]

})
export class UserInfoModule {}
