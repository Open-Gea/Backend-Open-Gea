import { GeneralInfo } from '../../models/records/generalInfo';
import { RecordRepository } from '../../repositories/record/recordRepository';
import { YvYError } from '../../utils/error';

export class RecordService<T> {
  constructor(private repository: RecordRepository<T>) {}

  async getAllByUser(idEntity: string): Promise<T[]> {
    return this.repository.getAllByUser(idEntity);
  }

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

  async softDelete(id:string): Promise<boolean>{
    return this.repository.softDelete(id);
  }

  async search(query?: string): Promise<T[]>{
    return this.repository.search(query);
  }
}
