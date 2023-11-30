import { BaseObject } from "../utils/common";
import { Lot } from "./lots";

export interface BioInputs extends BaseObject{
    name: string,
    type: string,
    liquidSolid: string,
    elaborationDate: Date,
    materialAndQuantity: object[]
    quantityProduced: number,
    unitProduced: string,
    productionCost: number,
    unitCost: string,
    responsibleName: string;
    processRegister: ProcessRegister;
    expirationDate: Date;
}


export type ProcessRegister = {
  startDateOfProduction?: string;
  endDateOfProduction?: string;
  flipDatesAndTemp: FlipDatesAndTemp[]
  notes: string;
};

export type FlipDatesAndTemp = {
  date: string;
  temp: string
}
  