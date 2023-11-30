import { DataSource } from 'typeorm';

import { TillageEntity } from '../../entities/soilReg/tillage.entity';
import { Tillage } from '../../models/soilReg/Tillage';
import { TillageRepository } from '../../repositories/soilReg/tillage.repository';


export class TillageDao  implements TillageRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }
 
  search: (query?: string | undefined) => Promise<Tillage[]>;


  async read(id: string): Promise<Tillage | undefined> {

    const result = await this.connection
      .createQueryBuilder()
      .select('tillage')
      .from(TillageEntity, 'tillage')
      .where('tillage.id = :id', { id })
      .getOne();

    return result ? result as unknown as Tillage : undefined;
  }

  async findById(id: string): Promise<Tillage[]  | undefined> {
    const result = await this.connection
    .createQueryBuilder()
    .select('tillage')
    .from(TillageEntity, 'tillage')
    .where('tillage.user = :id', { id })
    .getMany();

    return result as unknown as Tillage[];

  }
  async create(item: Tillage): Promise<Tillage | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(TillageEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as Tillage) : undefined;
  }

  async update(id: string, item: Tillage): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(TillageEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(TillageEntity)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }
}
