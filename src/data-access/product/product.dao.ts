import { DataSource } from 'typeorm';

import { ProductEntity } from '../../entities/product/product.entity';
import { Product } from '../../models/product/product';
import { ProductRepository } from '../../repositories/product/product.repository';

export class ProductDAO implements ProductRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }

  async findById(id: string): Promise<Product | undefined> {
    const productRepository = this.connection.getRepository(ProductEntity);
    const result = await productRepository.findOneBy({ id });

    return result as Product | undefined;
  }

  async create(item: Product): Promise<Product | undefined> {
    const productRepository = this.connection.getRepository(ProductEntity);
    const result = productRepository.create(item);
    await productRepository.insert(result);

    return result as Product | undefined;
  }


  async read(id: string): Promise<Product | undefined> {
    const productRepository = this.connection.getRepository(ProductEntity);
    const result = await productRepository.findOneBy({ id });

    return result as Product | undefined;
  }

  async update(id: string, item: Product): Promise<boolean> {
    const productRepository = this.connection.getRepository(ProductEntity);
    const result = await productRepository.update({ id }, item);

    return !!result;
  }

  async delete(id: string): Promise<boolean> {
    const productRepository = this.connection.getRepository(ProductEntity);
    const result = await productRepository.delete(id);

    return !!result;
  }

  async search(query?: string): Promise<Product[]> {
    let sql = 'SELECT * FROM products';
    if (query) {
      sql += ` WHERE name ILIKE '%${query}%' 
              OR category ILIKE '%${query}%' 
              OR description ILIKE '%${query}%'`;
    }
    const result = await this.connection.manager.query(sql);

    return result ? result as Product[] : [];
  }
}
