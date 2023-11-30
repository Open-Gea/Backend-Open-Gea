import { Tillage } from '../../models/soilReg/Tillage';
import { ICRUD } from '../utils/interfaces/ICRUD';


export interface TillageRepository extends ICRUD<Tillage>{
    
    findById(user: string): Promise<Tillage[] | undefined>;
 
}