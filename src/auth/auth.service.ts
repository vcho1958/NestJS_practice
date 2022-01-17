import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  passwordCheck(password: string, oldPassword: string): Boolean {
    return true;
  }
  validateUser(authentication: {
    username: string;
    password: string;
  }): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      resolve(true);
    });
  }
  signToken(body: { userId: number; role: string }) {}
}
