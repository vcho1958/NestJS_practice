import { Controller, Delete, Get, Param, Post as PostDecorator, Query, UseGuards, Request, Body } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { PostDto } from 'src/dto/post.dto';
import { Post } from '../../entity/post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService){}
  
  @Public()
  @Get()
  async getPosts(@Query() query: any): Promise<Post[]> {
    return this.postService.getPosts(query);
  }

  @Public()
  @Get(':id')
  async getPost(@Param('id') id:number): Promise<Post>{
    return this.postService.getPost(id);
  }

  @PostDecorator()
  async createPost(@Request() req: any, @Body() postDto:PostDto): Promise<Post>{
    return this.postService.createPost(req.user, postDto);
  }

  @Delete(':id')
  async deletePost(@Request() req: any, @Param('id') id:number): Promise<Post>{
    return this.postService.deletePost(req.user, id)
  }

  @PostDecorator(':id')
  async updatePost(@Request() req: any, @Param('id') id: number, @Body() postDto:PostDto): Promise<Post>{
    return this.postService.updatePost(req.user, id, postDto);
  }
}
