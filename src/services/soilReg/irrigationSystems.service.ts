import { IrrigationSystems } from '../../models/soilReg/IrrigationSystems';
import { IrrigationSystemsRepository } from '../../repositories/soilReg/irrigationSystems.repository';

export class IrrigationSystemsService {
  constructor(private repository: IrrigationSystemsRepository) { }

  async create(item: IrrigationSystems): Promise<IrrigationSystems | undefined> {
    return this.repository.create(item);
  }

  async read(id: string): Promise<IrrigationSystems | undefined> {
    return this.repository.read(id);
  }

  async update(id: string, item: IrrigationSystems): Promise<boolean> {
    return this.repository.update(id, item);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
  async findByUserId(id: string): Promise<IrrigationSystems[] | undefined> {
    return this.repository.findById(id);
  }
}
