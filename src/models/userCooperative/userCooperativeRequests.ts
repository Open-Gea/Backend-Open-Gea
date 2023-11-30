import { BaseObject, ExtensibleObject } from '../utils/common';
import { Cooperatives } from './cooperatives';
import { User } from '../user/user';

export interface UserCooperativeRequests extends BaseObject {
    coop: Cooperatives
    user: User
    status: STATUS
    messageBody: string
    origin: ORIGIN
}


export enum STATUS {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
  }

  export enum ORIGIN {
    USER = 'user',
    COOPERATIVE = 'cooperative'
  }

