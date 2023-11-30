
import { UserCooperativeRequests } from '../../models/userCooperative/userCooperativeRequests';
import { ICRUD } from '../utils/interfaces/ICRUD';


export interface UserCooperativeRequestsRepository extends ICRUD<UserCooperativeRequests> {

    getByOrigin(userId: string , origin: string): Promise<UserCooperativeRequests[]>;

}