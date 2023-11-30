import { BaseObject, ExtensibleObject } from '../utils/common';

import { User } from '../user/user';

export interface Tillage extends BaseObject {
  lot:string
  year: string 
  type: Type
  goal: Goal
  otherGoal: string
  machineryUsed: string
  dateWork : Date
  numberPassesPerWork : string
  tasks: string
  notes: string,
  deadline:Date
  necessaryMaterial:string
  budget: string
  completed: boolean;
  user: User,
  personInCharge:string,
  currency:string,
}

export enum Type {
    greenManures = 'primary',
    mulches = 'secondary'
  }

  export enum Goal {
    greenManures = 'implementConservationTillage',
    mulches = 'calibrateMachinery'
  }

