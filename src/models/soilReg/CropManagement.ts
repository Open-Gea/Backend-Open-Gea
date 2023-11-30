import { BaseObject, ExtensibleObject } from '../utils/common';
import { User } from '../user/user';

export interface CropManagement extends BaseObject {
  year: string 
  lot: string
  speciesToCultivate: string
  plantingDate: Date
  harvestDate: Date
  precedingSpecies: string
  targetMarket: string
  tasks: string
  deadline: Date
  notesObservations: string
  completed: boolean;
  user: User,
  personInCharge:string
}
