import { Injectable } from "@nestjs/common";
import { MemoryRepository } from "src/class/MemoryRepository";
import { IPostRepository } from "src/interface/IPostRepository";
import { Site } from "src/entity/site.entity";
import { User } from "src/entity/user.entity";
import { EntityRepository } from "typeorm";
import { Post } from "../../../entity/post.entity";


@Injectable()
@EntityRepository(Post)
export class PostMemoryRepository extends MemoryRepository<Post> implements IPostRepository{
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
}