import { Injectable } from "@nestjs/common";
import { ISiteRepository } from "src/interface/ISiteRepository";
import { EntityRepository, Repository } from "typeorm";
import { Site } from "../../../entity/site.entity";

@Injectable()
@EntityRepository(Site)
export class SiteTypeOrmRepository extends Repository<Site> implements ISiteRepository{
  findOneById(id: number): Promise<Site> {
    return this.findOne({id});
  }
  findOneByName(name: string): Promise<Site> {
    return this.findOne({name});
  }
  findOneByUrl(url: string): Promise<Site> {
    return this.findOne({url});
  }
  
}