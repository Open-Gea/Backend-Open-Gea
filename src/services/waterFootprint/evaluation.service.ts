import { Evaluation } from '../../models/waterFootprint/evaluation';
import { EvaluationRepository } from '../../repositories/waterFootprint/evaluation.repository';
import { FarmRepository } from '../../repositories/farm/farm.repository';
import { ProductRepository } from '../../repositories/product/product.repository';
import { UserRepository } from '../../repositories/user/user.repository';
import { YvYError } from '../../utils/error';

export class EvaluationSevice {
  constructor(
    private evaluationsRepository: EvaluationRepository,
    private userRepository: UserRepository,
    private farmRepository: FarmRepository,
    private productRepository: ProductRepository,
  ) {}

  async read(id: string): Promise<Evaluation | undefined> {
    return this.evaluationsRepository.read(id);
  }

  async update(id: string, item : Evaluation): Promise<boolean> {
    if (await this.evaluationsRepository.read(id)) {
      return this.evaluationsRepository.update(id, item);
    }
    throw new YvYError('Evaluation not found', 404,'Evaluation not found');
  }

  async delete(id: string): Promise<boolean> {
    return this.evaluationsRepository.delete(id);
  }

  async deleteByFarm(farm: string): Promise<boolean> {
    
    return this.evaluationsRepository.deleteByFarm(farm);
  }

  /* async search(query?: string): Promise <Evaluation[]> {
    return this.evaluationsRepository.search(query);
  } */

  async create(item: Evaluation): Promise<Evaluation | undefined> {
    const user = await this.userRepository.read(item.user.id);
    if (!user) {
      throw new YvYError('Evaluation not found', 404,'Evaluation not found');
    }
    const farm = await this.farmRepository.read(item.farm.id);
    if (!farm) {
      throw new YvYError('Farm not found', 404,'Farm not found');
    }
    const product = await this.productRepository.findById(item.product.id);
    if (!product) {
      throw new YvYError('Product not found', 404,'Product not found');
    } 
    item.user = user
    item.farm = farm
    item.product = product 
    
    return this.evaluationsRepository.create(item);
  }

  async findAll(): Promise <Evaluation | undefined> {
    return this.evaluationsRepository.findAll();
  }

  async findByFilter(filter: string, filterType: string): Promise<Evaluation[] | undefined> {
    return this.evaluationsRepository.findByFilter(filter, filterType);
  }

  async acceptOrReject(id: string, status: string): Promise<boolean> {
    return this.evaluationsRepository.acceptOrReject(id, status);
  }

  async findByUserAndFarm(user: string, farm: string): Promise<Evaluation[] | undefined> {
    return this.evaluationsRepository.findByUserAndFarmV2(user, farm);
  }


  async findByYear(year: string, farmId: string, userId: string) : Promise<Evaluation[] | undefined> {
    return this.evaluationsRepository.findByYear(year, farmId ,userId);
  }

}
