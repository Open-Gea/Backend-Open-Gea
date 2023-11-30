import { DataSource } from 'typeorm';

import { EmissionFactorEntity } from '../../entities/carbonFootprint/emissionFactor.entity';
import { EmissionFactor } from '../../models/carbonFootprint/emissionFactor';
import { EmissionFactorRepository } from '../../repositories/carbonFootprint/emissionFactor.repository';

export class EmissionFactorDAO implements EmissionFactorRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }


  async findById(id: string): Promise<EmissionFactor | undefined> {
    const result = await this.connection
      .getRepository(EmissionFactorEntity)
      .createQueryBuilder('emission_factor')
      .where('emission_factor.id = :id', { id })
      .loadAllRelationIds()
      .getOne();
    return result ? (result as EmissionFactor) : undefined;
  }

  async create(item: EmissionFactor): Promise<EmissionFactor | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(EmissionFactorEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0
      ? (result.generatedMaps[0] as EmissionFactor)
      : undefined;
  }

  async read(id: string): Promise<EmissionFactor | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('emission_factor')
      .from(EmissionFactorEntity, 'emission_factor')
      .where('emission_factor.id = :id', { id })
      .getOne();

    return result ? (result as EmissionFactor) : undefined;
  }

  async update(id: string, item: EmissionFactor): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(EmissionFactorEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(EmissionFactorEntity)
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async search(query?: string): Promise<EmissionFactor[]> {
    let sql = `SELECT * 
                FROM emission_factors`;

    if (query) {
      sql += `WHERE name ILIKE '%${query}%' 
              OR category ILIKE '%${query}%' 
              OR emission_factor ILIKE '%${query}%'
              `;
    }
    const result = await this.connection.manager.query(sql);

    return result ? (result as EmissionFactor[]) : [];
  }
}
