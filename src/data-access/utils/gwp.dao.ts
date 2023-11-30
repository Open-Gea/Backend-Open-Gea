import { DataSource } from 'typeorm';

import { GWPEntity } from '../../entities/utils/gwp.entity';
import { GWP } from '../../models/utils/gwp';
import { GWPRepository } from '../../repositories/utils/gwp.repository';

export class GWPDAO implements GWPRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }
  async findByName(name: string): Promise<GWP | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('gwp')
      .from(GWPEntity, 'gwp')
      .where('gwp.name = :name', { name })
      .loadAllRelationIds()
      .getOne();

    return result ? result as GWP : undefined;
  }

  async findById(id: string): Promise<GWP | undefined> {
    const result = await this.connection
      .getRepository(GWPEntity)
      .createQueryBuilder('gwp')
      .where('gwp.id = :id', { id })
      .loadAllRelationIds()
      .getOne();

    return result ? result as GWP : undefined;
  }

  async create(item: GWP): Promise<GWP | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(GWPEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as GWP) : undefined;
  }

  async read(id: string): Promise<GWP | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('gwp')
      .from(GWPEntity, 'gwp')
      .where('gwp.id = :id', { id })
      .getOne();

    return result ? result as GWP : undefined;
  }

  async update(id: string, item: GWP): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(GWPEntity)
      .set(item)
      .where('gwp.id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(GWPEntity)
      .where('gwp.id =: id', { id })
      .execute();

    return result.affected ? result.affected < 0 : false;
  }

  async search(query?: string | undefined): Promise<GWP[]> {
    let sql = `SELECT *
              FROM  gwp`;
    if (query) {
      sql += `WHERE name ILIKE '%${query}%'
              OR formula ILIKE '%${query}%'
              OR value ILIKE '%${query}%'`;
    }
    const result = await this.connection.manager.query(sql);
    return result ? result as GWP[] : [];
  }
}
