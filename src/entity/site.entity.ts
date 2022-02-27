import { EntityClass } from "src/class/EntityClass";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class Site extends EntityClass{
  @OneToOne(
    (type) => Post,
    (post:Post) => post.site
  )
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column()
  url: string;
}