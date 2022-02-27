import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../entity/post.entity';
import { PostTypeOrmRepository } from './repository/postTypeOrm.repository';
import { SiteModule } from '../site/site.module';
import { AuthModule } from '../auth/auth.module';
import { UserInformation } from '../../entity/UserInformation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ PostTypeOrmRepository]), SiteModule, AuthModule],
  providers: [PostService, {
    provide:'IPostRepository',
    useClass: PostTypeOrmRepository
  }],
  controllers: [PostController]
})
export class PostModule {}
