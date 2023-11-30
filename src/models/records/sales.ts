import { BaseObject } from "../utils/common";

export interface Sale extends BaseObject{
    saleDate: Date;
    revenue: number;
    coin: string;
    productSold: string;
    weightSold: string;
    unitSold: string;
    buyerName: string;
    buyerCountry: string;
}