import { Injectable } from "@nestjs/common";
import { IPostRepository } from "src/interface/IPostRepository";
import { Site } from "src/entity/site.entity";
import { User } from "src/entity/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { Post } from "../../../entity/post.entity";

@Injectable()
@EntityRepository(Post)
export class PostTypeOrmRepository extends Repository<Post> implements IPostRepository{
  findByAuthor(author: User): Promise<Post[]> {
    return this.find({author});
  }
  findBySite(site: Site): Promise<Post[]> {
    return this.find({site});
  }
  findByTitle(title: string): Promise<Post[]> {
    return this.find({title});
  }
  findByContent(content: string): Promise<Post[]> {
    return this.find({content});
  }
  findOneById(id: number): Promise<Post> {
    throw this.findOne({id});
  }
}