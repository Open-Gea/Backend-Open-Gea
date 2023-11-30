import { BaseObject } from "../utils/common";

export interface CategoryAutodiag extends BaseObject{
    name: string;
    description: string;
    rule: string;
}