import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomExceptionFilter } from './exception/customException.filter';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserInfoModule } from './user-info/user-info.module';
import { JwtAuthGuard } from './guard/JwtAuthGuard';

@Module({
  imports: [AuthModule, UserModule, UserInfoModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {}
