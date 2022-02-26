import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserInfoModule } from 'src/user-info/user-info.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, UserInfoModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
