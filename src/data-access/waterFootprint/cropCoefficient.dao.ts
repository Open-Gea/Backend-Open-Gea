import { DataSource } from 'typeorm';

import { CropCoefficientEntity } from '../../entities/waterFootprint/cropCoefficient.entity';
import { CropCoefficient } from '../../models/waterFootprint/cropCoefficient';
import { CropCoefficientRepository } from '../../repositories/waterFootprint/cropCoefficient.repository';

export class CropCoefficientDAO implements CropCoefficientRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }

  async findById(id: string): Promise<CropCoefficient | undefined> {
    const result = await this.connection
      .getRepository(CropCoefficientEntity)
      .createQueryBuilder('crop_coefficient')
      .where('crop_coefficient.id = :id', { id })
      .loadAllRelationIds()
      .getOne();
    return result ? (result as CropCoefficient) : undefined;
  }

  async create(item: CropCoefficient): Promise<CropCoefficient | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(CropCoefficientEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0
      ? (result.generatedMaps[0] as CropCoefficient)
      : undefined;
  }

  async read(id: string): Promise<CropCoefficient | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('crop_coefficient')
      .from(CropCoefficientEntity, 'crop_coefficient')
      .where('crop_coefficient.id = :id', { id })
      .getOne();

    return result ? (result as CropCoefficient) : undefined;
  }

  async update(id: string, item: CropCoefficient): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(CropCoefficientEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();
    return result.affected ? result.affected > 0 : false;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(CropCoefficientEntity)
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async search(query?: string): Promise<CropCoefficient[]> {
    let sql = `SELECT * 
                FROM crop_coefficient `;

    if (query) {
      sql += `WHERE name ILIKE '%${query}%'
      OR category ILIKE '%${query}%'
      `;
    }

    const result = await this.connection.manager.query(sql);

    return result ? (result as CropCoefficient[]) : [];
  }
}
