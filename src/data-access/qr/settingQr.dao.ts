import { DataSource } from 'typeorm';

import { SettingQrEntity } from '../../entities/qr/settingQr.entity';
import { SettingQr } from '../../models/qr/settingQr';
import { SettingQrRepository } from '../../repositories/qr/settingQr.repository';


export class SettingQrDAO implements SettingQrRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }

  async getAll(): Promise<SettingQr[]> {
    const result = await this.connection
      .createQueryBuilder()
      .select('setting-qr')
      .from(SettingQrEntity, 'settingqr')
      .getMany();

    return result as [];
  }

  async read(id: string): Promise<SettingQr | undefined> {
    const result = await this.connection
      .createQueryBuilder(SettingQrEntity, 'settingqr')
      .leftJoinAndSelect('settingqr.user_id', 'user')
      .leftJoinAndSelect('settingqr.farm_id', 'farm')
      .where('settingqr.id = :id', { id })
      .getOne();

    return result ? (result as unknown as SettingQr) : undefined;
  }



  async getAllByUserId(userId: string, farmId: string): Promise<SettingQr[]> {

    const result = await this.connection
    .createQueryBuilder(SettingQrEntity, 'settingqr')
    .leftJoinAndSelect('settingqr.user_id', 'user', 'user.id = settingqr.user_id')
    .leftJoinAndSelect('settingqr.farm_id', 'farm', 'farm.id = settingqr.farm_id')
    .select([
      'settingqr.id',
      'settingqr.carbon_footprint',
      'settingqr.water_footprint',
      'settingqr.environmental_certificates',
      'settingqr.personal_data_preferences',
      'settingqr.created_at',
      'user.id',
      'farm.id',
    ])
    .where('settingqr.user_id = :userId', { userId })
    .andWhere('settingqr.farm_id = :farmId', { farmId })
    .getMany();
    return result as unknown as SettingQr[];
  }
  
  async create(item: SettingQr): Promise<SettingQr | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(SettingQrEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as SettingQr) : undefined;
  }

  async update(id: string, item: SettingQr): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(SettingQrEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(SettingQrEntity)
      .where('id = :id', { id })
      .execute();

    return result.affected !== 0;
  }
}