import { DeepPartial } from "typeorm";

export interface IRepository<Entity>{
  find(condition: Object):Promise<Entity[]>;
  findOne(condition: Object):Promise<Entity>;
  findById(id: number): Promise<Entity>;
  save(entity: Entity|DeepPartial<Entity>): Promise<Entity>;
  remove(user: Entity): Promise<Entity>;
}