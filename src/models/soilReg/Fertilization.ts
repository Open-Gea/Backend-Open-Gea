import { BaseObject, ExtensibleObject } from '../utils/common';
import { User } from '../user/user';

export interface Fertilization extends BaseObject {
  lot: string
  fertilizationType: FertilizationType
  cultivatedSpecies: string
  goal: Goal
  tasks: string
  deadline: Date
  budget: string
  notes: string
  year: string;
  completed: boolean;
  user: User
  personInCharge:string,
  currency:string,
}

export enum FertilizationType {
  chemical = 'chemical',
  organic = 'organic'
}

export enum Goal {
  applyFertilizers = 'Apply Fertilizers',
  calibrateMachinery = 'Calibrate Machinery',
  performSoilAnalysis = 'Perform Soil Analysis',
  consultTrainedPersonnel = 'Consult Trained Personnel',
  makeOrganicFertilizers = 'Make Organic Fertilizers',
  buyOrganicFertilizers = 'Buy Organic Fertilizers',
  applyOrganicFertilizers = 'Apply Organic Fertilizers',
  other = 'Other'
}
