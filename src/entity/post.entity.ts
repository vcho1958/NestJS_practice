import { AfterLoad, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityClass } from 'src/class/EntityClass';
import { User } from 'src/entity/user.entity';
import { Site } from 'src/entity/site.entity';
import { UserInformation } from 'src/entity/UserInformation.entity';

@Entity()
export class Post extends EntityClass{

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    type => UserInformation,
    (author: UserInformation) => author.id,
  )
  @JoinColumn()
  author: UserInformation;

  @OneToOne(
    type => Site,
    (site: Site) => site.id
  )
  @JoinColumn()
  site: Site;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  views: number;

  @Column()
  scrapCount: number;

}