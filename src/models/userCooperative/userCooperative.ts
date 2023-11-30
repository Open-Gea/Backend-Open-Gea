import { BaseObject, ExtensibleObject } from '../utils/common';
import { Cooperatives } from './cooperatives';
import { User } from '../user/user';

export interface UserCooperative extends BaseObject{
    user: User,
    cooperative: Cooperatives
}