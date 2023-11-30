import { CoverManagement } from '../../models/soilReg/CoverManagement';
import { ICRUD } from '../utils/interfaces/ICRUD';


export interface CoverManagementRepository extends ICRUD<CoverManagement>{
    
    findById(user: string): Promise<CoverManagement[] | undefined>;
 
}