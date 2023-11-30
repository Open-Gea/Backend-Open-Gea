import { Cooperatives } from '../../models/userCooperative/cooperatives';
import { ICRUD } from '../utils/interfaces/ICRUD';
import { ISearch } from '../utils/interfaces/ISearch';

export interface CooperativeRepository extends ICRUD<Cooperatives>, ISearch<Cooperatives> {
  findById(id: string): Promise<Cooperatives | undefined>;
  findByEmail(email: string): Promise<Cooperatives | undefined>;
  disable(id: string): Promise<boolean>;
  enable(id: string): Promise<boolean>;
  findByCountry(countryId: string): Promise<Cooperatives[]>;

}
