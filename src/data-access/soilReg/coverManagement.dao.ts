import { DataSource } from 'typeorm';

import { CoverManagementEntity } from '../../entities/soilReg/coverManagement.entity';
import { CoverManagement } from '../../models/soilReg/CoverManagement';
import { CoverManagementRepository } from '../../repositories/soilReg/coverManagement.repository';


export class CoverManagementDao implements CoverManagementRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }
 
  search: (query?: string | undefined) => Promise<CoverManagement[]>;


  async read(id: string): Promise<CoverManagement | undefined> {

    const result = await this.connection
      .createQueryBuilder()
      .select('covermanagement')
      .from(CoverManagementEntity, 'covermanagement')
      .where('covermanagement.id = :id', { id })
      .getOne();

    return result ? result as CoverManagement : undefined;
  }

  async findById(id: string): Promise<CoverManagement[]  | undefined> {
    const result = await this.connection
    .createQueryBuilder()
    .select('covermanagement')
    .from(CoverManagementEntity, 'covermanagement')
    .where('covermanagement.user = :id', { id })
    .getMany();

    return result as unknown as CoverManagement[];

  }
  async create(item: CoverManagement): Promise<CoverManagement | undefined> {
    
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(CoverManagementEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as CoverManagement) : undefined;
  }

  async update(id: string, item: CoverManagement): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(CoverManagementEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(CoverManagementEntity)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }
}
