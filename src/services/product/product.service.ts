import { Product } from '../../models/product/product';
import { ProductRepository } from '../../repositories/product/product.repository';
import { YvYError } from '../../utils/error';

export class ProductService {
  constructor(private repository: ProductRepository) { }

  async search(query?: string): Promise<Product[]> {
    return this.repository.search(query);
  }

  async create(item: Product): Promise<Product | undefined> {
    return this.repository.create(item);
  }

  async read(id: string): Promise<Product | undefined> {
    return this.repository.read(id);
  }

  async update(id: string, item: Product): Promise<boolean> {
    if (await this.repository.findById(id)) {
      return this.repository.update(id, item);
    }
    throw new YvYError('Product not found', 404 ,'Product not found');
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
