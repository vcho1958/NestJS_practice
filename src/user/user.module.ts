import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserMemoryRepository } from './repository/userMemory.repository';

@Module({
  providers: [UserService, {
    provide: 'IUserRepository',
    useClass: UserMemoryRepository
  }],
  exports: [UserService]
})
export class UserModule { }
