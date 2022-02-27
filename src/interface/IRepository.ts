import { DeepPartial, Repository } from "typeorm";

export interface IRepository<Entity> extends Repository<Entity> {
  find(condition: Object):Promise<Entity[]>;
  findOne(condition: Object):Promise<Entity>;
  findOneById(id: number): Promise<Entity>;
}