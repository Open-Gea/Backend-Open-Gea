import { BaseObject, ExtensibleObject } from '../utils/common';
import { User } from '../user/user';

export interface CoverManagement extends BaseObject {
  lot: string;
  species: string;
  plantingDate: Date;
  harvestDate: Date;
  precedingCrop: string;
  tasks: string;
  type: Types;
  deadline: Date;
  notes: string;
  material: string;
  datePlacement: string;
  budget: string;
  quantityMaterial: string;
  year: string;
  completed: boolean;
  user: User;
  personInCharge:string,
  currency:string,
  goal:string
}

export enum Types {
  greenManures = 'greenManures',
  mulches = 'mulches'
}
