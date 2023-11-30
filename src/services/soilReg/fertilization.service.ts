import { Fertilization } from '../../models/soilReg/Fertilization';
import { FertilizationRepository } from '../../repositories/soilReg/fertilization.repository';

export class FertilizationService {
  constructor(private repository: FertilizationRepository) { }

  async update(itemId: string, item: Fertilization): Promise<boolean> {

    return this.repository.update(itemId, item)

  }

  async delete(itemId: string): Promise<boolean> {
    return this.repository.delete(itemId);
  }

  async create(item: Fertilization): Promise<Fertilization | undefined> {
    return this.repository.create(item);
  }

  async findByUserId(id: string): Promise<Fertilization[] | undefined> {
    return this.repository.findById(id);
  }


}
