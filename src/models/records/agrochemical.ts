import { BaseObject } from "../utils/common";

export interface Agrochemical extends BaseObject{
    purchaseDate: string;
    brand: string;
    volume: number;
    unit: string;
    activeIngredient: string;
    expirationDate: string;
}