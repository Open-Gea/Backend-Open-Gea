import { DataSource } from 'typeorm';
import { FertilizationEntity } from '../../entities/soilReg/fertilization.entity';
import { Fertilization } from '../../models/soilReg/Fertilization';
import { FertilizationRepository } from '../../repositories/soilReg/fertilization.repository';

export class FertilizationDao implements FertilizationRepository {
  private connection;

  constructor(c : DataSource) {
    this.connection = c;
  }

  async read(id: string): Promise<Fertilization | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('fertilization')
      .from(FertilizationEntity, 'fertilization')
      .where('fertilization.id = :id', { id })
      .getOne();

    return result ? result as Fertilization : undefined;
  }

  async findById(id: string): Promise<Fertilization[]  | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('fertilization')
      .from(FertilizationEntity, 'fertilization')
      .where('fertilization.user = :id', { id })
      .getMany();

    return result as unknown as Fertilization[];
  }

  async create(item: Fertilization): Promise<Fertilization | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(FertilizationEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as Fertilization) : undefined;
  }

  async update(id: string, item: Fertilization): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(FertilizationEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(FertilizationEntity)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }
}
