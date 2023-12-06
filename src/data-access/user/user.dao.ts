import { DataSource } from 'typeorm';
import { UserEntity } from '../../entities/user/user.entity';
import { User, UserStatus } from '../../models/user/user';
import { UserRepository } from '../../repositories/user/user.repository';
import { GenericDAOV2 } from '../utils/generic.dao';


export class UserDAO extends GenericDAOV2<UserEntity> implements UserRepository{
    constructor(connection: DataSource){
      super(connection,UserEntity)
    }

  async findByEmail(email: string): Promise<User> {
    const queryBuilder = this.repository.createQueryBuilder("user");

    queryBuilder.loadAllRelationIds();
    queryBuilder.where('user.email = :email', {email});

    const result = await queryBuilder.getOne() as User;

    return result;
  }


  async disable(id: string): Promise<boolean> {
    const result = await this.repository.update(id, {status : UserStatus.DISABLED});
    return result.affected !== undefined && result.affected > 0;
  }

  async enable(id: string): Promise<boolean> {
   const result = await this.repository.update(id, {status : UserStatus.ACTIVE});
   return result.affected !== undefined && result.affected > 0;
  }

  async updateAcceptedTermsConditionsForActiveUsers(): Promise<boolean> {
    const result = await this.repository.update(
      { status: UserStatus.ACTIVE },
      { acceptedTermsConditions: false }
    )
  
    return result.affected ? result.affected > 0 : false;
  }

  async findByCountry(countryId: string): Promise<User[]> {
    const queryBuilder = this.repository.createQueryBuilder("user");

    queryBuilder.loadAllRelationIds();
    queryBuilder.where('user.country = :countryId', {countryId});

    const result = await queryBuilder.getMany() as User[];

    return result;
  }

  async findByResetToken(resetToken: string): Promise<User> {
    const queryBuilder = this.repository.createQueryBuilder("user");

    queryBuilder.loadAllRelationIds();
    queryBuilder.where('user.resetToken = :resetToken', {resetToken});

    const result = await queryBuilder.getOne() as User;

    return result;
  }

    
}

