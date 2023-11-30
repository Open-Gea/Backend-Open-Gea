import { DataSource } from 'typeorm';
import { CropManagementEntity } from '../../entities/soilReg/cropManagement.entity';
import { CropManagement } from '../../models/soilReg/CropManagement';
import { CropManagementRepository } from '../../repositories/soilReg/cropManagement.repository';

export class CropManagementDao implements CropManagementRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }
 
  async read(id: string): Promise<CropManagement | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('cropmanagement')
      .from(CropManagementEntity, 'cropmanagement')
      .where('cropmanagement.id = :id', { id })
      .getOne();

    return result ? result as CropManagement : undefined;
  }

  async findByUserId(id: string): Promise<CropManagement[]  | undefined> {
    const result = await this.connection
    .createQueryBuilder()
    .select('cropmanagement')
    .from(CropManagementEntity, 'cropmanagement')
    .where('cropmanagement.user = :id', { id })
    .getMany();

    return result as unknown as CropManagement[];

  }
  async create(item: CropManagement): Promise<CropManagement | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(CropManagementEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as CropManagement) : undefined;
  }

  async update(id: string, item: CropManagement): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(CropManagementEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(CropManagementEntity)
      .where('id = :id', { id })
      .execute();
    return result.affected !== 0;
  }
}
