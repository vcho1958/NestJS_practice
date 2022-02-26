import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomExceptionFilter } from './exception/customException.filter';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserInfoModule } from './user-info/user-info.module';

@Module({
  imports: [AuthModule, UserModule, UserInfoModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {}
