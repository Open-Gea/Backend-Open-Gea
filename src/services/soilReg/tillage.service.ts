import { Tillage } from '../../models/soilReg/Tillage';
import { TillageRepository } from '../../repositories/soilReg/tillage.repository';

export class TillageService {
  constructor(private repository: TillageRepository) { }


  async update(itemId: string, item: Tillage): Promise<boolean> {

    return this.repository.update(itemId, item)

  }

  async delete(itemId: string): Promise<boolean> {
    return this.repository.delete(itemId);
  }

  async create(item: Tillage): Promise<Tillage | undefined> {
    return this.repository.create(item);
  }

  async findByUserId(id: string): Promise<Tillage[] | undefined> {
    return this.repository.findById(id);
  }


}
