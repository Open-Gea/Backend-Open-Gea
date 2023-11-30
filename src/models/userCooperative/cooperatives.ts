import { BaseObject, ExtensibleObject } from '../utils/common';
import { UserStatus } from '../user/user';

export interface Cooperatives extends BaseObject{
  name: string,
  country: string,
  email: string,
  profile_picture?: Buffer,
  description?: string
  password?: string,
  acceptedTermsConditions:boolean
  status: UserStatus
  resetToken?:string
  resetTokenExpires?: Date
}