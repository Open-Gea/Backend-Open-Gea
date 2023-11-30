import { Fertilization } from '../../models/soilReg/Fertilization';
import { ICRUD } from '../utils/interfaces/ICRUD';


export interface FertilizationRepository extends ICRUD<Fertilization>{
    
    findById(user: string): Promise<Fertilization[] | undefined>;
 
}