import { DataSource } from 'typeorm';
import { IrrigationSystemsEntity } from '../../entities/soilReg/irrigationSystems.entity';
import { IrrigationSystems } from '../../models/soilReg/IrrigationSystems';
import { IrrigationSystemsRepository } from '../../repositories/soilReg/irrigationSystems.repository';

export class IrrigationSystemsDao implements IrrigationSystemsRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }
 
  async read(id: string): Promise<IrrigationSystems | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('croprotation')
      .from(IrrigationSystemsEntity, 'croprotation')
      .where('croprotation.id = :id', { id })
      .getOne();

    return result ? result as unknown as IrrigationSystems : undefined;
  }

  async findById(id: string): Promise<IrrigationSystems[]  | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('croprotation')
      .from(IrrigationSystemsEntity, 'croprotation')
      .where('croprotation.user = :id', { id })
      .getMany();

    return result as unknown as IrrigationSystems[];
  }
  async create(item: IrrigationSystems): Promise<IrrigationSystems | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(IrrigationSystemsEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as IrrigationSystems) : undefined;
  }

  async update(id: string, item: IrrigationSystems): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(IrrigationSystemsEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(IrrigationSystemsEntity)
      .where('id = :id', { id })
      .execute();
    return result.affected !== 0;
  }
}
