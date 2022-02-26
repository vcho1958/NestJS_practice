import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { TokenDto } from 'src/dto/token.dto';
import { UserInfoDto } from 'src/dto/userInfo.dto';
import { UserInformation } from 'src/user-info/entity/UserInformation';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from 'src/guard/LocalAuthGuard';
import { Public } from 'src/decorator/public.decorator';
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService){}
  
  @Public()
  @Post('join')
  join(@Body()userInfoDto: UserInfoDto): Promise<UserInformation>{
    return this.authService.join(userInfoDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any): Promise<TokenDto>{
    return await this.authService.signToken(req.user);
  }
  
}
