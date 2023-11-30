import { IrrigationSystems } from '../../models/soilReg/IrrigationSystems';
import { ICRUD } from '../utils/interfaces/ICRUD';


export interface IrrigationSystemsRepository extends ICRUD<IrrigationSystems>{
    
    findById(user: string): Promise<IrrigationSystems[] | undefined>;
 
}