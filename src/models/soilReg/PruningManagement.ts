import { BaseObject, ExtensibleObject } from '../utils/common';
import { User } from '../user/user';

export interface PruningManagement extends BaseObject {
  goal: Goal
  lot: string
  tasks: string
  deadline: Date
  materials: string
  budget: string
  notesObservations: string
  user: User
  year: string;
  completed: boolean;
  personInCharge:string,
  currency:string,
}

export enum Goal {
  compostPrunings = 'compostPrunings',
  chipUseAsMulch = 'chipUseAsMulch'
}
