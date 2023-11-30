import { Product } from '../../models/product/product';
import { ICRUD } from '../utils/interfaces/ICRUD';
import { ISearch } from '../utils/interfaces/ISearch';

export interface ProductRepository extends ICRUD<Product>, ISearch<Product> {
  findById(id: string): Promise<Product | undefined>;
}
