import { CoverManagement } from '../../models/soilReg/CoverManagement';
import { CoverManagementRepository } from '../../repositories/soilReg/coverManagement.repository';

export class CoverManagementService {
  constructor(private repository: CoverManagementRepository) { }


  async update(itemId: string, item: CoverManagement): Promise<boolean> {

    return this.repository.update(itemId, item)

  }

  async delete(itemId: string): Promise<boolean> {
    return this.repository.delete(itemId);
  }

  async create(item: CoverManagement): Promise<CoverManagement | undefined> {

    return this.repository.create(item);
  }

  async findByUserId(id: string): Promise<CoverManagement[] | undefined> {
    return this.repository.findById(id);
  }


}
