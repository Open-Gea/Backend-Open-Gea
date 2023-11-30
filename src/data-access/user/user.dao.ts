import { DataSource } from 'typeorm';

import { UserEntity } from '../../entities/user/user.entity';
import { User, UserStatus } from '../../models/user/user';
import { UserRepository } from '../../repositories/user/user.repository';


export class UserDAO implements UserRepository {
  private connection: DataSource;

  constructor(c : DataSource) {
    this.connection = c;
  }
  async findByCountry(countryId: string): Promise<User[]> {
    const users = await this.connection
    .getRepository(UserEntity)
    .createQueryBuilder('user')
    .where('user.country = :countryId', { countryId })
    .getMany();

  return users;
    
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('user')
      .from(UserEntity, 'user')
      .where('user.email = :email', { email })
      .loadAllRelationIds()
      .getOne();

    return result ? result as User : undefined;
  }

  async findById(id: string): Promise<User | undefined> {
    const result = await this.connection
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .loadAllRelationIds()
      .getOne();

    return result ? result as User : undefined;
  }

  async findByIdNoRelations(id: string): Promise<User | undefined> {
    const result = await this.connection
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    return result ? result as User : undefined;
  }

  async findByCooperative(cooperativeId: string) {
    const users = await this.connection
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.cooperative = :cooperativeId', { cooperativeId })
      .getMany();
  
    return users;
  }

  async create(item: User): Promise<User | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(item)
      .returning('*')
      .execute();

    return result.generatedMaps.length > 0 ? (result.generatedMaps[0] as User) : undefined;
  }

  async read(id: string): Promise<User | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select('user')
      .from(UserEntity, 'user')
      .where('user.id = :id', { id })
      .getOne();

    return result ? result as User : undefined;
  }

  async update(id: string, item: User): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(UserEntity)
      .set(item)
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async search(query?: string): Promise<User[]> {
    let sql = `SELECT * 
                FROM users`;
    if (query) {
      sql += `WHERE name ILIKE '%${query}%' 
              OR lastname ILIKE '%${query}%' 
              OR email ILIKE '%${query}%'`;
    }
    const result = await this.connection.manager.query(sql);

    return result ? result as User[] : [];
  }

  async disable(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(UserEntity)
      .set({ status: UserStatus.DISABLED })
      .where('id = :id', { id })
      .execute();
    return result.affected ? result.affected > 0 : false;
  }

  async enable(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(UserEntity)
      .set({ status: UserStatus.ACTIVE })
      .where('id = :id', { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }



  async findByResetToken(resetToken: string): Promise<User | undefined> {
    const result = await this.connection
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.resetToken = :resetToken', { resetToken })
      .loadAllRelationIds()
      .getOne();

    return result ? result as User : undefined;
  }

  async updateAcceptedTermsConditionsForActiveUsers(): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(UserEntity)
      .set({ acceptedTermsConditions: false })
      .where('status = :status', { status: UserStatus.ACTIVE })
      .execute();
  
    return result.affected ? result.affected > 0 : false;
  }

}
