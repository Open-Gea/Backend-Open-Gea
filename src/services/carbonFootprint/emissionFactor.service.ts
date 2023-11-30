import { EmissionFactor } from '../../models/carbonFootprint/emissionFactor';
import { EmissionFactorRepository } from '../../repositories/carbonFootprint/emissionFactor.repository';
import { YvYError } from '../../utils/error';

export class EmissionFactorService {
  constructor(private repository: EmissionFactorRepository) {}

  async add(item: EmissionFactor): Promise<EmissionFactor | undefined> {
    // Check if chemical_formula is correct...
    const result = await this.repository.create(item);
    return result;
  }

  async read(id: string): Promise<EmissionFactor | undefined> {
    return this.repository.read(id);
  }

  async update(id: string, item: EmissionFactor): Promise<boolean> {
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
