import { BaseObject, ExtensibleObject } from '../utils/common';
import { Farm } from '../farm/farm';
import { Product } from '../product/product';
import { User } from '../user/user';

export interface Evaluation extends BaseObject{
  farm: Farm
  user: User
  registerDate: Date
  evotranspiration: evotranspirationInterface
  startDate: Date
  endDate: Date
  hectares: number
  tons: number
  product: Product
  score: number
  status: EvaluationStatus
}

export enum EvaluationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface evotranspirationInterface {
  hh_total: number,
  hh_green: number,
  hh_blue: number
}
