import { EmissionFactor } from '../../models/carbonFootprint/emissionFactor';
import { ICRUD } from '../utils/interfaces/ICRUD';
import { ISearch } from '../utils/interfaces/ISearch';

export interface EmissionFactorRepository extends ICRUD<EmissionFactor>, ISearch<EmissionFactor> {
  findById(id: string): Promise<EmissionFactor | undefined>;
}

export interface Ifilter {
  countries?: Array<string>;
  years?: Array<string>;
}
