import { BaseObject } from "../utils/common";


export interface Performance extends BaseObject{
    estimatedYield: string,
    year: string,
    harvestDate: Date,
    cultivatedSpecies: string,
    finalYield: string,
    productDestiny: string,
}