import { BaseObject } from "../utils/common";
import { Lot } from "./lots";

export interface Labor extends BaseObject{
    dateOfLabor: Date,
    crop: string,
    labor: string,
    responsibleName: string,
    lot: Lot,
    notes: string
}