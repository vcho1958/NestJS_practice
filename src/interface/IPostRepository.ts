import { Post } from 'src/entity/post.entity';
import { Site } from 'src/entity/site.entity';
import { User } from 'src/entity/user.entity';
import { IRepository } from './IRepository';

export interface IPostRepository extends IRepository<Post>{
  findByAuthor(author: User): Promise<Post[]>;
  findBySite(site: Site): Promise<Post[]>;
  findByTitle(title: string): Promise<Post[]>;
  findByContent(content: string): Promise<Post[]>;
}
