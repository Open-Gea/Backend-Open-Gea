import { BaseObject } from "../utils/common";
import { urls } from "../farm/farm";

export interface Staff extends BaseObject{
    firstName: string;
    lastName: string;
    area: string;
    contractType: string;
    urls: urls[] | null;
}