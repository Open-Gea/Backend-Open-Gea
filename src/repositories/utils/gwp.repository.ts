import { GWP } from '../../models/utils/gwp';
import { ICRUD } from './interfaces/ICRUD';
import { ISearch } from './interfaces/ISearch';

export interface GWPRepository extends ICRUD<GWP>, ISearch<GWP> {
  findByName(name: string): Promise<GWP | undefined>
  findById(id: string): Promise<GWP | undefined>
}
