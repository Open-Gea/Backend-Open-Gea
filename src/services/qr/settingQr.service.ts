
import { SettingQr } from '../../models/qr/settingQr';
import { SettingQrRepository } from '../../repositories/qr/settingQr.repository';
import { YvYError } from '../../utils/error';

export class SettingQrService {
  constructor(private repository: SettingQrRepository) { }


  async create(item: SettingQr): Promise<SettingQr | undefined> {

    return this.repository.create(item);
  }

  async read(id: string): Promise<SettingQr | undefined> {

    return this.repository.read(id);
  }

  async update(id: string, item: SettingQr): Promise<boolean> {

    if (await this.repository.read(id)) {
      return this.repository.update(id, item);
    }
    throw new YvYError('Farm not found', 404,'Farm not found');
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async getAllByUserId(userId: string, farmId: string): Promise<SettingQr[]> {
    return this.repository.getAllByUserId(userId , farmId);
  }



}