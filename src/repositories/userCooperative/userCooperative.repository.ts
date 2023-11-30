
import { User } from '../../models/user/user';
import { UserCooperative } from '../../models/userCooperative/userCooperative';
import { ICRUD } from '../utils/interfaces/ICRUD';
import { ISearch } from '../utils/interfaces/ISearch';

export interface UserCooperativeRepository extends ICRUD<UserCooperative>, ISearch<UserCooperative> {
  findUsersByCoop(coopId:string): Promise<UserCooperative[]>;
  findCooperativesByUser(userId:string): Promise<UserCooperative[]>;
}