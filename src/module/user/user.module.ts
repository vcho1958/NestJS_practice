import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserMemoryRepository } from './repository/userMemory.repository';
import { UserTypeOrmRepository } from './repository/userTypeORM.repository';
import { User } from '../../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmRepository])],
  providers: [UserService, {
    provide: 'IUserRepository',
    useClass: UserTypeOrmRepository
  }],
  exports: [UserService]
})
export class UserModule { }
