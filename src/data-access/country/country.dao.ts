import { DataSource } from 'typeorm';

import { CountryEntity } from '../../entities/country/country.entity';
import { Country } from '../../models/country/country';
import { CountryRepository } from '../../repositories/country/country.repository';

export class CountryDao implements CountryRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }

  async getAll(): Promise<Country[]> {
    const result = await this.connection
      .createQueryBuilder()
      .select('country')
      .from(CountryEntity, 'country')
      .getMany();

    return result as Country[];
  }

  async read(id: string): Promise<Country | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('country')
      .from(CountryEntity, 'country')
      .where('country.id = :id', { id })
      .getOne();

    return result ? result as Country : undefined;
  }

  async getAllByUserId(userId: string): Promise<Country[]> {

    const result = await this.connection
      .createQueryBuilder()
      .select('country')
      .from(CountryEntity, 'country')
      .where('country.userid = :userId', { userId })
      .getMany();

    return result as Country[];
  }

  async findById(id: string): Promise<Country | undefined> {
    const result = await this.connection
      .getRepository(CountryEntity)
      .createQueryBuilder('country')
      .where('country.id = :id', { id })
      .getOne();

    return result ? result as Country : undefined;
  }

  async create(item: Country): Promise<Country | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(CountryEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as Country) : undefined;
  }

  async update(id: string, item: Country): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(CountryEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(CountryEntity)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }
}
