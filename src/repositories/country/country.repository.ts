import { Country } from '../../models/country/country';
import { ICRUD } from '../utils/interfaces/ICRUD';

export interface CountryRepository extends ICRUD<Country> {
  getAll(): Promise<Country[]>;
  findById(id: string): Promise<Country | undefined>;
  
}
