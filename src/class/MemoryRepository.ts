import { IRepository } from "src/interface/IRepository";
import { DeepPartial, RemoveOptions, Repository } from "typeorm";
import { EntityClass } from "./EntityClass";

export class MemoryRepository<E extends EntityClass> extends Repository<E>{
  Memory: Array<E>;
  constructor() {
    super();
    this.Memory = [];
  }

  async findOne(condition:Object): Promise<E>{
    return this.Memory.find(memory => {
      for(let key in condition) {
        if (memory[key] === condition[key])return true;
      }
      return false;
    });
  };

  async find(condition:Object): Promise<E[]>{
    return this.Memory.filter(memory => {
      for(let key in condition) {
        if (memory[key] === condition[key])return true;
      }
      return false;
    });
  };
  
  async findOneById(id: number): Promise<E> {
    return this.Memory.find(entity => entity.id === id);
  }


}