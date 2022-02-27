import { Inject, Injectable } from '@nestjs/common';
import { IPostRepository } from 'src/interface/IPostRepository';
import { Post } from '../../entity/post.entity';
import errors from 'src/exception';
import { CustomException } from 'src/exception/customException';
import { PostDto } from 'src/dto/post.dto';
import { SiteService } from '../site/site.service';
import { Authentication } from 'src/class/Authentication';
import { AuthService } from '../auth/auth.service';
const {POST_NOT_FOUND, PERMISSON_REQUIRED} = errors;



@Injectable()
export class PostService {
  constructor(
    @Inject('IPostRepository') private postRepository: IPostRepository,
    private siteService: SiteService,
    private authService: AuthService
  ){}
  async getPost(id:number):Promise<Post> {
    const post = await this.postRepository.findOne({id});
    if(!post)throw new CustomException(POST_NOT_FOUND);
    post.views++;
    return await post.save();
  }

  async getPosts(query: any):Promise<Post[]> {
    return await this.postRepository.find(query);
  }

  async createPost(user: Authentication, postDto:PostDto):Promise<Post> {
    const userInfo = await this.authService.getUserInformation(user);
    const site = await this.siteService.getSite(postDto.site);
    const newPost = await this.postRepository.create({...postDto, author: userInfo, site})
    return await newPost.save();
  }

  async updatePost(user: Authentication, id: number, newPost: PostDto):Promise<Post> {
    const post = await this.postRepository.findOne({id});
    if(!post)throw new CustomException(POST_NOT_FOUND);
    if(post.author.id !== user.userInfoId)throw new CustomException(PERMISSON_REQUIRED);
    return this.postRepository.save({ ...newPost, author: post.author, site:post.site});
  }

  async deletePost(user: Authentication, id: number):Promise<Post> {
    const post = await this.postRepository.findOne({id});
    if(!post)throw new CustomException(POST_NOT_FOUND);
    if(post.author.id !== user.userInfoId)throw new CustomException(PERMISSON_REQUIRED);
    return await this.postRepository.remove(post);
  }
}
