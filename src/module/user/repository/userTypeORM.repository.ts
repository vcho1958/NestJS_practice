import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/constants';
import errors from 'src/exception';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../../entity/user.entity';
import { IUserRepository } from '../../../interface/IUserRepository';


@Injectable()
@EntityRepository(User)
export class UserTypeOrmRepository extends Repository<User> implements IUserRepository{
  async findOneById(id: number): Promise<User> {
    return await this.findOne(id);
  }

  async findByUsername(username: string): Promise<User>{
    return await this.findOne({username});
  };

  async findAllByRole(role: UserRole): Promise<User[]>{
    return await this.find({role});
  };
}
