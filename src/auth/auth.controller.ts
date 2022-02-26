import { Body, Controller, Post } from '@nestjs/common';
import { LoginDataDto } from 'src/dto/loginData.dto';
import { UserInfoDto } from 'src/dto/userInfo.dto';
import { UserInformation } from 'src/user-info/entity/UserInformation';
import { User } from 'src/user/entity/User';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService){}
  @Post('join')
  join(@Body()userInfoDto: UserInfoDto): Promise<UserInformation>{
    return this.authService.join(userInfoDto);
  }

  @Post('login')
  login(@Body()loginData: LoginDataDto): Promise<User>{
    return this.authService.validateUser(loginData);
  }
  
}
