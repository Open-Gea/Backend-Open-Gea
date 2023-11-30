import { BaseObject } from "../utils/common";
import { urls } from "../farm/farm";
import { Lot } from "./lots";

export interface Soil extends BaseObject{
    lot: Lot,
    year: string,
    usage: string,
    notes: string,
    urls: urls[] | null;
}