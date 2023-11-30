import { CropManagement } from '../../models/soilReg/CropManagement';
import { ICRUD } from '../utils/interfaces/ICRUD';

export interface CropManagementRepository extends ICRUD<CropManagement>{
  findByUserId(user: string): Promise<CropManagement[] | undefined>;
}
