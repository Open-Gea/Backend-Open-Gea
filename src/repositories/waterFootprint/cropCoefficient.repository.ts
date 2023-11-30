import { CropCoefficient } from '../../models/waterFootprint/cropCoefficient';
import { ICRUD } from '../utils/interfaces/ICRUD';
import { ISearch } from '../utils/interfaces/ISearch';

export interface CropCoefficientRepository extends ICRUD<CropCoefficient>, ISearch<CropCoefficient> {
  findById(id: string): Promise<CropCoefficient | undefined>;
}
