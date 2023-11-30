import { BaseObject } from "../utils/common";

export interface GeneralInfo extends BaseObject{ 
    name: string,
    ubication: object,
    owner: string,
    location: string,
    totalSurface: string,
    start: string,
    infrastructure: string,
    perimeter: string,
    hidricRes: Hidric,
    farmId: string
  }
  
  export enum Hidric {LAGUNA = "LAGUNA", LAGO= "LAGO", RIO= "RIO", POZO= "POZO", OTRO= "OTRO"}