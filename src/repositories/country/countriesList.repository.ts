import { CountriesList } from '../../models/country/countriesList';
import { Country } from '../../models/country/country';


export interface CountriesListRepository {
  getAll(): Promise<CountriesList[]>;
  findByCode(code: string): Promise<CountriesList | undefined>;
}
