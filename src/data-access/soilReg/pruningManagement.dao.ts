import { DataSource } from 'typeorm';
import { PruningManagementEntity } from '../../entities/soilReg/pruningManagement.entity';
import { PruningManagement } from '../../models/soilReg/PruningManagement';
import { PruningManagementRepository } from '../../repositories/soilReg/pruningManagement.repository';

export class PruningManagementDao implements PruningManagementRepository {
  private connection;

  constructor(c : DataSource) {
    this.connection = c;
  }

  async read(id: string): Promise<PruningManagement | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('pruningManagement')
      .from(PruningManagementEntity, 'pruningManagement')
      .where('pruningManagement.id = :id', { id })
      .getOne();

    return result ? result as PruningManagement : undefined;
  }

  async findByUserId(id: string): Promise<PruningManagement[]  | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('pruningManagement')
      .from(PruningManagementEntity, 'pruningManagement')
      .where('pruningManagement.user = :id', { id })
      .getMany();

    return result as unknown as PruningManagement[];
  }

  async create(item: PruningManagement): Promise<PruningManagement | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(PruningManagementEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as PruningManagement) : undefined;
  }

  async update(id: string, item: PruningManagement): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(PruningManagementEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(PruningManagementEntity)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }
}
