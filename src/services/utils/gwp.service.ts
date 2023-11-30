import { StatusCodes } from 'http-status-codes';

import { GWP } from '../../models/utils/gwp';
import { GWPRepository } from '../../repositories/utils/gwp.repository';
import { YvYError } from '../../utils/error';

export class GWPService {
  constructor(
    private repository: GWPRepository
  ) { }

  async read(id: string): Promise<GWP | undefined> {
    return this.repository.read(id);
  }

  async create(item: GWP): Promise<boolean> {
    if (!(await this.repository.findByName(item.name))) {
      this.repository.create(item);
      return true;
    }
    throw new YvYError('GWP already exist', StatusCodes.BAD_REQUEST,'GWP already exist');
  }

  async update(id: string, item: GWP): Promise<boolean> {
    if (await this.repository.findById(id)) {
      return this.repository.update(id, item);
    }
    throw new YvYError('GWP not found', 404, 'GWP not found');
  }

  async search(query?: string): Promise<GWP[]> {
    return this.repository.search(query);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async findByName(name: string): Promise<GWP | undefined> {
    return this.repository.findByName(name);
  }

  async findById(id: string): Promise<GWP | undefined> {
    return this.repository.findById(id);
  }
}
