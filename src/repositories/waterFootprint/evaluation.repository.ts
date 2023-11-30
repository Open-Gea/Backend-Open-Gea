import { Evaluation } from '../../models/waterFootprint/evaluation';
import { ICRUD } from '../utils/interfaces/ICRUD';

export interface EvaluationRepository extends ICRUD<Evaluation> {
  findAll(): Promise <Evaluation | undefined>;
  findByFilter(filter: string, filterType: string): Promise<Evaluation[] | undefined>;
  acceptOrReject(id: string, state:string): Promise<boolean>;
  deleteByFarm(farm:string): Promise<boolean>;
  findByUserAndFarm(user: string, farm: string): Promise<Evaluation[] | undefined>;
  findByYear(year: string, farm: string, user: string): Promise<Evaluation[] | undefined>;
  findByUserAndFarmV2(user: string, farm: string): Promise<Evaluation[] | undefined>;
}
