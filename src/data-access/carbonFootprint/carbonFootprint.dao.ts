import { DataSource } from 'typeorm';

import { CarbonFootprintRepository } from '../../repositories/carbonFootprint/carbonFootprint.repository';
import { CarbonFootPrint } from '../../models/carbonFootprint/carbonFootprint';
import { CarbonFootPrintEntity } from '../../entities/carbonFootprint/carbonFootprint';

export class CarbonFootPrintDAO implements CarbonFootprintRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }

  async findAll(): Promise<CarbonFootPrint | undefined> {
    let sql = 'SELECT * FROM carbon_footprint'
    const result = await this.connection.manager.query(sql);
    return result ? result as CarbonFootPrint : undefined;
  }

  async findByFilter(filter: string, filterType: string): Promise<CarbonFootPrint[]> {
    const sql = `SELECT * FROM carbon-footprint WHERE ${filterType} ILIKE '%${filter}%'`;
    const result = await this.connection.manager.query(sql);
    return result || [];
  }

  async create(item: CarbonFootPrint): Promise<CarbonFootPrint | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(CarbonFootPrintEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as CarbonFootPrint) : undefined;
  }

  async deleteByFarm(farm: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(CarbonFootPrintEntity)
      .where('farm = :farm', { farm })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async read(id: string): Promise<CarbonFootPrint | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('evaluation')
      .from(CarbonFootPrintEntity, 'evaluation')
      .where('evaluation.id = :id', { id })
      .getOne();

    return result ? result as CarbonFootPrint : undefined;
  }

  async update(id: string, item: CarbonFootPrint): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(CarbonFootPrintEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(CarbonFootPrintEntity)
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async findByFarmId(farmId: string): Promise<CarbonFootPrint[] | undefined> {

    const results = await this.connection
    .getRepository(CarbonFootPrintEntity)
    .createQueryBuilder('carbon_footprint')
    .where('farm = :farmId', { farmId })
    .orderBy('carbon_footprint.year', 'DESC') 
    .addOrderBy('carbon_footprint.created_at', 'DESC') 
    .leftJoinAndSelect('carbon_footprint.emissionFactor', 'emissionFactor')
    .getMany();
      return results as unknown as CarbonFootPrint[] | undefined;
}

}
