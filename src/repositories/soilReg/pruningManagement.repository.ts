import { PruningManagement } from '../../models/soilReg/PruningManagement';
import { ICRUD } from '../utils/interfaces/ICRUD';

export interface PruningManagementRepository extends ICRUD<PruningManagement>{
    
    findByUserId(user: string): Promise<PruningManagement[] | undefined>;
}
