import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../interface/IUserRepository';
import errors from '../../exception';
import { CustomException } from 'src/exception/customException';
import { User } from '../../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/dto/user.dto';
const {USER_NOT_FOUND, DUPLICATE_USERNAME, EQUAL_PASSWORD} = errors;
@Injectable()
export class UserService {
  constructor( @Inject('IUserRepository') private userRepository: IUserRepository){}
  
  async getUserById(id: number): Promise<User>{
    const user = await this.userRepository.findOne({id});
    if(!user)throw new CustomException(USER_NOT_FOUND);
    return user;
  }

  async getUserByUsername(username: string): Promise<User>{
    const user = await this.userRepository.findByUsername(username);
    if(!user)throw new CustomException(USER_NOT_FOUND);
    return user;
  }

  async checkDuplicateOfUsername(username: string): Promise<boolean>{
    if(await this.userRepository.findOne({username}))throw new CustomException(DUPLICATE_USERNAME);
    return true;
  }
  async createUser(userDto: UserDto): Promise<User>{
    const {username} = userDto;
    await this.checkDuplicateOfUsername(username);
    const createdUser = await this.userRepository.save(userDto);
    return createdUser;
  }

  async deleteUser(id: number): Promise<User>{
    const user = await this.userRepository.findOne({id});
    if(!user)throw new CustomException(USER_NOT_FOUND);
    return await this.userRepository.remove(user);
  }

  async updateRole(id:number, modifiedUser: UserDto): Promise<User>{
    const user = await this.userRepository.findOne({id});
    if(!user)throw new CustomException(USER_NOT_FOUND);
    return await this.userRepository.save({...modifiedUser, id});
  }

  comparePassword(inputPassword: string, hashedPassword: string): boolean{
    return bcrypt.compareSync(inputPassword, hashedPassword);
  }

  updatePassword(user:User, password:string): Promise<User>{
    if(this.comparePassword(password, user.password))throw new CustomException(EQUAL_PASSWORD);
    user.password = password;
    return this.userRepository.save(user);
  }
  
}