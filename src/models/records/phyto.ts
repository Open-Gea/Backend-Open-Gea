import { BaseObject } from "../utils/common";


export interface Phyto extends BaseObject{
    type: string,
    productName: string,
    brand: string,
    activeSubstance: string,
    phytoClass: string,
    toxicologicType: string,
    appDate: string,
    crop: string,
    cropVariety: string,
    pestToCombat: string,
    dose: number,
    doseUnit: string,
    machineryUsed:string,
    safetyReturnDate: string,
    gracePeriod: string,
    responsibleName: string,
    elaborationType: string,
    recipe: boolean
}