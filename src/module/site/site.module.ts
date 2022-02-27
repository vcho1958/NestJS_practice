import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from '../../entity/site.entity';
import { SiteTypeOrmRepository } from './repository/siteTypeOrm.repository';
import { SiteService } from './site.service';

@Module({
  imports: [TypeOrmModule.forFeature([Site])],
  providers: [SiteService, {
    provide: 'ISiteRepository',
    useClass: SiteTypeOrmRepository
  }
  ],
  exports:[SiteService]
})
export class SiteModule {}
