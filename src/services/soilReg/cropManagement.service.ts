import { CropManagement } from '../../models/soilReg/CropManagement';
import { CropManagementRepository } from '../../repositories/soilReg/cropManagement.repository';

export class CropManagementService {
  constructor(private repository: CropManagementRepository) { }

  async update(itemId: string, item: CropManagement): Promise<boolean> {
    return this.repository.update(itemId, item);
  }

  async delete(itemId: string): Promise<boolean> {
    return this.repository.delete(itemId);
  }

  async create(item: CropManagement): Promise<CropManagement | undefined> {
    return this.repository.create(item);
  }

  async findByUserId(id: string): Promise<CropManagement[] | undefined> {
    return this.repository.findByUserId(id);
  }
}
