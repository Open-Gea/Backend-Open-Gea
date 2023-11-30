import { Cooperatives } from '../../models/userCooperative/cooperatives';
import { User } from '../../models/user/user';
import { ICRUD } from '../utils/interfaces/ICRUD';
import { ISearch } from '../utils/interfaces/ISearch';

export interface UserRepository extends ICRUD<User>, ISearch<User> {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByIdNoRelations(id: string): Promise<User | undefined>;
  findByCooperative(cooperativeId: string): Promise<User[] | undefined>;
  disable(id: string): Promise<boolean>;
  enable(id: string): Promise<boolean>;
  findByResetToken(email: string): Promise<User | undefined>;
  updateAcceptedTermsConditionsForActiveUsers(): Promise<any>;
  findByCountry(countryId: string): Promise<User[]>;
}
