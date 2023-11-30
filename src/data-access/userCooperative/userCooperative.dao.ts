import { DataSource, DeepPartial, EntityMetadata, Repository } from 'typeorm';

import { UserCooperativeRepository } from '../../repositories/userCooperative/userCooperative.repository';
import { UserCooperative } from '../../models/userCooperative/userCooperative';
import { UserCooperativeEntity } from '../../entities/userCooperative/userCooperative.entity';
import { User } from '../../models/user/user';

export class UserCooperativeDAO implements UserCooperativeRepository {
  private connection: DataSource;
  private repo: Repository<UserCooperativeEntity>;
  private metadata : EntityMetadata

  constructor(connection: DataSource) {
        this.connection = connection; 
        this.repo = connection.getRepository(UserCooperativeEntity)
        this.metadata = connection.getMetadata(UserCooperativeEntity)
  }
    async findUsersByCoop(coopId: string): Promise<UserCooperative[]> {
        
        const result = await this.repo.createQueryBuilder('user_coop')
        .leftJoinAndSelect('user_coop.user', 'user')
        .where("user_coop.cooperative = :coopId", {coopId})
        .select(["user_coop", "user.id", "user.email", "user.name", "user.lastname", "user.country","user.phone", "user.username", "user.acceptedTermsConditions", "user.profile_picture"])
        .getMany();
    

        return result;
    }

    async findCooperativesByUser(userId: string): Promise<UserCooperative[]> {
        const result = await this.repo.createQueryBuilder('user_coop')
        .leftJoinAndSelect('user_coop.cooperative', 'cooperative')
        .where("user_coop.user = :userId", {userId})
        .select(["user_coop", "cooperative.id", "cooperative.name", "cooperative.country", "cooperative.email", "cooperative.description"])
        .getMany();

        return result;
    }



    
    async create(item: UserCooperative): Promise<UserCooperative | undefined> {
        const result = this.repo.create(item);
        await this.repo.insert(result);
    
        return result as UserCooperative | undefined;
    }

    async read(id: string): Promise<UserCooperative | undefined> {
        const result = await this.repo.findOneBy({ id });
    
        return result as UserCooperative | undefined;
    }

    async update(id: string, item: UserCooperative): Promise<boolean> {
        const result = await this.repo.update({ id }, item);
    
        return !!result;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repo.delete(id);
    
        return !!result;
    }

    async search(query?: string | undefined): Promise<UserCooperative[]>{
        
        if(query === 'userId'){
            //buscar todos los user_coop de ese usuario
            
        }

        if(query == 'cooperativeId'){
            //buscar todos los user_coop de ese usuario
        }

        return []
    }

  
}

