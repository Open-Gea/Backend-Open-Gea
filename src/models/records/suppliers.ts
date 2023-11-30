import { BaseObject } from "../utils/common";

export interface Supplier extends BaseObject{
    name: string;
    phone: string;
    email:string;
    service:string;
    state: string;
}