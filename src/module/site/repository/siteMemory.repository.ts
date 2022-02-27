import { Injectable } from "@nestjs/common";
import { MemoryRepository } from "src/class/MemoryRepository";
import { ISiteRepository } from "src/interface/ISiteRepository";
import { EntityRepository } from "typeorm";
import { Site } from "../../../entity/site.entity";


@Injectable()
@EntityRepository(Site)
export class SiteMemoryRepository extends MemoryRepository<Site> implements ISiteRepository{
  findOneByName(name: string): Promise<Site> {
    return this.findOne({name});
  }
  findOneByUrl(url: string): Promise<Site> {
    return this.findOne({url});
  }
  

}