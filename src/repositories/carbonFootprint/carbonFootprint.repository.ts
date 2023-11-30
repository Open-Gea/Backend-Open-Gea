import { CarbonFootPrint } from '../../models/carbonFootprint/carbonFootprint';
import { ICRUD } from '../utils/interfaces/ICRUD';

export interface CarbonFootprintRepository extends ICRUD<CarbonFootPrint> {
  findAll(): Promise <CarbonFootPrint | undefined>;
  findByFilter(filter: string, filterType: string): Promise<CarbonFootPrint[] | undefined>;
  deleteByFarm(farm:string): Promise<boolean>;
  findByFarmId(farm:string):Promise <CarbonFootPrint[] | undefined>;
}
