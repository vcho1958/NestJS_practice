import { Site } from "src/entity/site.entity";
import { IRepository } from "./IRepository";

export interface ISiteRepository extends IRepository<Site>{
  findOneByName(name:string):Promise<Site>;
  findOneByUrl(url:string):Promise<Site>;
}