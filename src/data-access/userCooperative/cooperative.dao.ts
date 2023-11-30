import { DataSource } from 'typeorm';

import { ProductEntity } from '../../entities/product/product.entity';
import { CooperativeRepository } from '../../repositories/userCooperative/cooperative.repository';
import { Cooperatives } from '../../models/userCooperative/cooperatives';
import { CooperativesEntity } from '../../entities/userCooperative/cooperativesEntity';
import { UserStatus } from '../../models/user/user';

export class CooperativeDAO implements CooperativeRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }
  async disable(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(CooperativesEntity)
      .set({ status: UserStatus.DISABLED })
      .where('id = :id', { id })
      .execute();
    return result.affected ? result.affected > 0 : false;
  }

  async enable(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(CooperativesEntity)
      .set({ status: UserStatus.ACTIVE })
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }
  async findByCountry(countryId: string): Promise<Cooperatives[]> {

    const users = await this.connection
      .getRepository(CooperativesEntity)
      .createQueryBuilder('cooperatives')
      .where('cooperatives.country = :countryId', { countryId })
      .getMany();
    return users;
  }

  async findByEmail(email: string): Promise<Cooperatives | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('cooperatives')
      .from(CooperativesEntity, 'cooperatives')
      .where('cooperatives.email = :email', { email })
      .loadAllRelationIds()
      .getOne();

    return result ? result as Cooperatives : undefined;
  }

  async findById(id: string): Promise<Cooperatives | undefined> {
    const coopRepository = this.connection.getRepository(CooperativesEntity);
    const result = await coopRepository.findOneBy({ id });

    return result as Cooperatives | undefined;
  }

  async create(item: Cooperatives): Promise<Cooperatives | undefined> {
    const coopRepository = this.connection.getRepository(CooperativesEntity);
    const result = coopRepository.create(item);
    await coopRepository.insert(result);

    return result as Cooperatives | undefined;
  }

  async read(id: string): Promise<Cooperatives | undefined> {
    const coopRepository = this.connection.getRepository(CooperativesEntity);
    const result = await coopRepository.findOneBy({ id });

    return result as Cooperatives | undefined;
  }

  async update(id: string, item: Cooperatives): Promise<boolean> {
    const coopRepository = this.connection.getRepository(CooperativesEntity);
    const result = await coopRepository.update({ id }, item);

    return !!result;
  }

  async delete(id: string): Promise<boolean> {
    const coopRepository = this.connection.getRepository(ProductEntity);
    const result = await coopRepository.delete(id);

    return !!result;
  }

  async search(query?: string): Promise<Cooperatives[]> {
    let sql = 'SELECT * FROM cooperatives';
    if (query) {
      sql += ` WHERE name ILIKE '%${query}%' 
              OR category ILIKE '%${query}%' 
              OR description ILIKE '%${query}%'`;
    }
    const result = await this.connection.manager.query(sql);

    return result ? result as Cooperatives[] : [];
  }
}
