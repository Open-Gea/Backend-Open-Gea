import { DataSource } from 'typeorm';


import { UserCooperativeRequestsRepository } from '../../repositories/userCooperative/userCooperativeRequest.repository';
import { UserCooperativeRequests } from '../../models/userCooperative/userCooperativeRequests';
import { UserCooperativeRequestsEntity } from '../../entities/userCooperative/userCooperativeRequests.entity';


export class UserCooperativeRequestsDAO implements UserCooperativeRequestsRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }

  async getByOrigin(userId: string, origin: string): Promise<UserCooperativeRequests[]> {
    let originField = 'coop';
    let joinField = 'user';
  
    if (origin === 'user') {
      originField = 'user';
      joinField = 'coop';
    }
  
    const result = await this.connection
      .createQueryBuilder()
      .select('user_cooperative_requests')
      .from(UserCooperativeRequestsEntity, 'user_cooperative_requests')
      .leftJoinAndSelect(`user_cooperative_requests.${joinField}`, joinField)
      .where(`user_cooperative_requests.${originField} = :userId`, { userId })
      .getMany();
    
    return result as UserCooperativeRequests[];
  }
  

  async create(item: UserCooperativeRequests): Promise<UserCooperativeRequests | undefined> {

    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(UserCooperativeRequestsEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as UserCooperativeRequestsEntity) : undefined;
  }


  async read(id: string): Promise<UserCooperativeRequests | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('user_cooperative_requests')
      .from(UserCooperativeRequestsEntity, 'user_cooperative_requests')
      .where('user_cooperative_requests.id = :id', { id })
      .getOne();

    return result ? result as unknown as UserCooperativeRequests : undefined;

  }

  async update(id: string, item: UserCooperativeRequests): Promise<boolean> {
    const coopRepository = this.connection.getRepository(UserCooperativeRequestsEntity);
    const result = await coopRepository.update({ id }, item);

    return !!result;
  }


  async delete(id: string): Promise<boolean> {
    const repo = this.connection.getRepository(UserCooperativeRequestsEntity);
    const item = await repo.findOneBy({ id });

    if (!item) {
      throw new Error('UserCooperativeRequest not found');
    }

    const result = await repo.delete(id);

    return !!result;
  }




}
