import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserInfoModule } from 'src/module/user-info/user-info.module';
import { UserModule } from 'src/module/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [UserModule, UserInfoModule, PassportModule, 
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
