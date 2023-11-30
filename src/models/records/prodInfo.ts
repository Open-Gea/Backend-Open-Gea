import { LotEntity } from "../../entities/records/lots.entity";
import { BaseObject } from "../utils/common";
import { Lot } from "./lots";

export interface ProdInfo extends BaseObject{
    dateProdInfo: Date;
    agricultural: Agricultural[];
    agriculturalHectares: number;
    livestock: Livestock[];
    livestockHectares: number;
}

export type Agricultural = {
    crop : string,
    hectares: number,
    driving : string,
    otherDriving: string,
    underCover: boolean,
    coverHectares: number,
    lots: Lot[]
}

export type Livestock = {
    species : string[],
    hectares: number,
    density: number,
    driving: string,
    otherDriving: string,
    lots : Lot[],
}

export enum ProductionTypeEnum { 
    AGRICULTURAL = 'AGRICULTURAL',
    LIVESTOCK = 'LIVESTOCK'
}

export enum CropsTypeEnum { 
    FRUITY = 'FRUITY',
    HORTICULTURAL = 'HORTICULTURAL',
    GRAIN = 'GRAIN',
    FORAGES = 'FORAGES',
    TIMBER = 'TIMBER',
    OTHER = 'OTHER'
}


export enum AgriculturalDrivingTypeEnum {
    CONVENTIONAL = 'CONVENTIONAL',
    AGROECOLOGICAL = 'AGROECOLOGICAL',
    AGROECOLOGICAL_TRANSITION = 'AGROECOLOGICAL_TRANSITION',
    OTHER = 'OTHER'
    
}

export enum LivestockDrivingTypeEnum {
    INTENSIVE = 'INTENSIVE',
    EXTENSIVE = 'EXTENSIVE',
    MIXED = 'MIXED',
    OTHER = 'OTHER'
}
