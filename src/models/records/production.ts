import { LotEntity } from "../../entities/records/lots.entity";
import { BaseObject } from "../utils/common";
import { Lot } from "./lots";

export interface Production extends BaseObject{
    agricultural: Agricultural[];
    agriculturalHectares: number;
    livestock: Livestock[];
    livestockHectares: number;
}

export interface Agricultural{
    crop : CropsTypeEnum,
    hectares: number,
    driving : AgriculturalDrivingTypeEnum,
    otherDriving: string,
    underCover: boolean,
    coverHectares: number,
    lots: string[]
}

export interface Livestock{
    species : string[],
    hectares: number,
    density: number,
    driving: LivestockDrivingTypeEnum,
    otherDriving: string,
    lots : string[],
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
