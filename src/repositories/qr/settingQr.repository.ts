import { SettingQr } from '../../models/qr/settingQr';
import { ICRUD } from '../utils/interfaces/ICRUD';

export interface SettingQrRepository extends ICRUD<SettingQr> {

    getAllByUserId(userId: string , farmId: string): Promise<SettingQr[]>;
}