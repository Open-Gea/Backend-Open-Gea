import { BaseObject } from "../utils/common";
import { Farm } from "../farm/farm";

export interface RevenuesExpenses extends BaseObject{
    date: string;
    type: string;
    category: string;
    amount: number;
    coin: string;
    detail: string;
}