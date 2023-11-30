import { CountryEntity } from '../../entities/country/country.entity';
import { BaseObject, ExtensibleObject } from '../utils/common';


export interface User extends BaseObject {
  name: string 
  lastname: string
  phone: string
  country: string
  email: string
  username: string
  role?: UserRole
  status: UserStatus
  password?: string,
  resetToken?:string
  resetTokenExpires?: Date
  acceptedTermsConditions:boolean
  description?: string
  profile_picture?: Buffer
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  PRODUCER= 'PRODUCER'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DISABLED = 'DISABLED'
}
