import { BaseObject } from "../utils/common";


export interface Fertilization extends BaseObject{
    type: string;
    organicType: string;
    name: string;
    brand: string;
    dateOfUse: Date;
    crop: string;
    dosePlant: number;
    dosePlantUnit:string;
    doseArea: number;
    doseAreaUnit: string;
    responsibleName: string;
    recipe: boolean;
    elaborationType: string;
    machineryUsed: string;
}
