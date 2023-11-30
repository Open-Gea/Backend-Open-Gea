import { PruningManagement } from '../../models/soilReg/PruningManagement';
import { PruningManagementRepository } from '../../repositories/soilReg/pruningManagement.repository';

export class PruningManagementService {
  constructor(private repository: PruningManagementRepository) { }

  async update(itemId: string, item: PruningManagement): Promise<boolean> {
    return this.repository.update(itemId, item)
  }

  async delete(itemId: string): Promise<boolean> {
    return this.repository.delete(itemId);
  }

  async create(item: PruningManagement): Promise<PruningManagement | undefined> {
    return this.repository.create(item);
  }

  async findByUserId(id: string): Promise<PruningManagement[] | undefined> {
    return this.repository.findByUserId(id);
  }
}
