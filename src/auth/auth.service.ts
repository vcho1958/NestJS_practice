import { Injectable } from '@nestjs/common';
import { AuthenticationDto } from './dto/authentication.dto';

@Injectable()
export class AuthService {
  passwordCheck(password: string, oldPassword: string): boolean {
    return true;
  }
  validateUser(authentication: AuthenticationDto): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      resolve(true);
    });
  }
  signToken(userInfoDto: UserInfoDto): Promise<> { }
}
