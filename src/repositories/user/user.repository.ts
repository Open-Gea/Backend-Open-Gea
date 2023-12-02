import { User } from '../../models/user/user';
import { GenericRepo } from '../utils/generic.repo';

export interface UserRepository extends GenericRepo<User>{
  findByEmail(email: string): Promise<User>;
  disable(id: string): Promise<boolean>;
  enable(id: string): Promise<boolean>;
  findByResetToken(email: string): Promise<User>;
  updateAcceptedTermsConditionsForActiveUsers(): Promise<any>;
  findByCountry(countryId: string): Promise<User[]>;
}
