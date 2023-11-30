import { BaseObject } from "../utils/common";
import { Lot } from "./lots";

export interface Sowing extends BaseObject{
    species: string,
    dateOfSowing: Date,
    seedsInKg: number,
    sowingDensity: number,
    sowingOrigin: string,
    predecessorCrop: string,
    varietySown: string
}