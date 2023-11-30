import { UserCooperativeRequests } from '../../models/userCooperative/userCooperativeRequests';
import { UserCooperativeRequestsRepository } from '../../repositories/userCooperative/userCooperativeRequest.repository';

export class UserCooperativeRequestsService {
  constructor(private repository: UserCooperativeRequestsRepository) { }

  async update(itemId: string, item: UserCooperativeRequests): Promise<boolean> {

    return this.repository.update(itemId, item)
  }

  async read(id: string): Promise<UserCooperativeRequests | undefined> {
    
    return this.repository.read(id);
  }

  async getByOrigin(userId: string, origin:string ): Promise<UserCooperativeRequests[]>{
    
    return this.repository.getByOrigin(userId, origin);

  }

  async delete(itemId: string): Promise<boolean> {
    return this.repository.delete(itemId);
  }

  async create(item: UserCooperativeRequests): Promise<UserCooperativeRequests | undefined> {
    return this.repository.create(item);
  }


}
