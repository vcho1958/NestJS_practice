import { Entity, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EntityClass extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}