import { Farm } from '../../models/farm/farm';
import { ICRUD } from '../utils/interfaces/ICRUD';

export interface FarmRepository extends ICRUD<Farm> {
  getAll(): Promise<Farm[]>;
  getAllByUserId(userId: string): Promise<Farm[]>;
  findById(id: string): Promise<Farm | undefined>;
}
