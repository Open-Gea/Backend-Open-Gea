import { BaseObject, ExtensibleObject } from '../utils/common';
import { User } from '../user/user';

export interface IrrigationSystems extends BaseObject{
  lot: string
  goal: Objective
  otherGoal: string
  tasks: string
  deadline: Date
  materials: string
  budget: string
  notesObservations: string
  user: User
  year: string;
  completed: boolean;
  materialsAndWasteList: string
  management: string
  personInCharge:string,
  currency:string,
}

export enum Objective {
  EvaluateRisks = 'evaluateRisks',
  WaterAnalysis = 'waterAnalysis',
  InstallFilters = 'installFilters',
  ProtectClean = 'protectClean',
  DripIrrigation = 'dripIrrigation',
  LaboratoryAnalysis = 'laboratoryAnalysis',
  OptimizeWaterUse = 'optimizeWaterUse',
  TreatWasteWater = 'treatWasteWater',
  Other = 'other'
}
