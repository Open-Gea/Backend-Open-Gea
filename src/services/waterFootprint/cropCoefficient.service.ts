import { CropCoefficient } from '../../models/waterFootprint/cropCoefficient';
import { CropCoefficientRepository } from '../../repositories/waterFootprint/cropCoefficient.repository';
import { YvYError } from '../../utils/error';

export class CropCoefficientService {
  constructor(private repository: CropCoefficientRepository) { }

  async add(item: CropCoefficient): Promise<CropCoefficient | undefined> {
    // Check if chemical_formula is correct...
    const result = await this.repository.create(item);
    return result;
  }

  async read(id: string): Promise<CropCoefficient | undefined> {
    return this.repository.read(id);
  }

  async update(id: string, item: CropCoefficient): Promise<boolean> {
    if (await this.repository.findById(id)) {
      return this.repository.update(id, item);
    }
    throw new YvYError('Emission Factor not found', 404,'Emission Factor not found');
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async search(query?: string) {
    return this.repository.search(query);
  }
}
