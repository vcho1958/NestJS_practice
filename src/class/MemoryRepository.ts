import { IRepository } from "src/interface/IRepository";
import { DeepPartial } from "typeorm";
import { EntityClass } from "./Entity";

export class MemoryRepository<E extends EntityClass> implements IRepository<E> {
  Memory: Array<E>;
  constructor() {
    this.Memory = [];
  }
  
  save(entity: E | DeepPartial<E>): Promise<E> {
    throw new Error("Method not implemented.");
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
  
  async findById(id: number): Promise<E> {
    return this.Memory.find(entity => entity.id === id);
  }

  async remove(user: E): Promise<E> {
    delete this.Memory[this.Memory.indexOf(this.Memory.find(target=> user.id === target.id))];
    return user;
  }

}