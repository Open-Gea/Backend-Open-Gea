import { GenericRepo } from "../../repositories/utils/generic.repo";
import { YvYError } from "../../utils/error";


export class GenericService<T> {
  constructor(protected repository: GenericRepo<T>) {}

  async create(item: T): Promise<T | undefined> {
    return this.repository.create(item);
  }

  async read(id: string): Promise<T | undefined> {
    return this.repository.read(id);
  }

  async update(id: string, item: T): Promise<T | boolean> {
    if (await this.repository.read(id)) {
      return this.repository.update(id, item);
    }
    throw new YvYError('User not found', 404,'User not found');
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async search(query?: string): Promise<T[]>{
    return this.repository.search(query);
  }
}
