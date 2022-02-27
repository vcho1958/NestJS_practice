import { Module, Post } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomExceptionFilter } from './exception/customException.filter';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { UserInfoModule } from './module/user-info/user-info.module';
import { JwtAuthGuard } from './guard/JwtAuthGuard';
import { PostModule } from './module/post/post.module';
import { SiteModule } from './module/site/site.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entity/site.entity';
import { UserInformation } from './entity/UserInformation.entity';
import { User } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'testPassword!',
    database: 'test',
    entities: [__dirname + "/entity/*.ts"],
    autoLoadEntities: true,
    synchronize: true,
  }), AuthModule, UserModule, UserInfoModule, PostModule, SiteModule],
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
