import { DataSource } from 'typeorm';

import { FarmEntity } from '../../entities/farm/farm.entity';
import { Farm } from '../../models/farm/farm';
import { FarmRepository } from '../../repositories/farm/farm.repository';

export class FarmDao implements FarmRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }

  async getAll(): Promise<Farm[]> {
    const result = await this.connection
      .createQueryBuilder()
      .select('farm')
      .from(FarmEntity, 'farm')
      .getMany();

    return result as Farm[];
  }

  async read(id: string): Promise<Farm | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('farm')
      .from(FarmEntity, 'farm')
      .where('farm.id = :id', { id })
      .getOne();

    return result ? result as Farm : undefined;
  }

  async getAllByUserId(userId: string): Promise<Farm[]> {

    const result = await this.connection
      .createQueryBuilder()
      .select('farm')
      .from(FarmEntity, 'farm')
      .where('farm.userid = :userId', { userId })
      .getMany();

    return result as Farm[];
  }

  async findById(id: string): Promise<Farm | undefined> {
    const result = await this.connection
      .getRepository(FarmEntity)
      .createQueryBuilder('farm')
      .where('farm.id = :id', { id })
      .loadAllRelationIds()
      .getOne();

    return result ? result as Farm : undefined;
  }

  async create(item: Farm): Promise<Farm | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(FarmEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as Farm) : undefined;
  }

  async update(id: string, item: Farm): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(FarmEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(FarmEntity)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }
}
