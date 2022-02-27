import { Inject, Injectable } from '@nestjs/common';
import { SiteDto } from 'src/dto/site.dto';
import { ISiteRepository } from 'src/interface/ISiteRepository';
import { Site } from '../../entity/site.entity';
@Injectable()
export class SiteService {
  constructor(@Inject('ISiteRepository') private siteRepository: ISiteRepository){}

  async getSite(siteDto: SiteDto): Promise<Site>{
    const {name, url} = siteDto;
    const site = await this.siteRepository.findOne({where: [{name}, {url}]});
    if(!site)return this.save(siteDto);
    return site;
  }

  async save(siteDto: SiteDto): Promise<Site>{
    return this.siteRepository.save(siteDto);
  }
}
