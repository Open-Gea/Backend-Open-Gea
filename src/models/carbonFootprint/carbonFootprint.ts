import { BaseObject, ExtensibleObject } from '../utils/common';
import { EmissionFactor } from './emissionFactor';
import { Farm } from '../farm/farm';

export interface CarbonFootPrint extends BaseObject {
    farm: Farm,
    year: string,
    result: number,
    emissionFactor: EmissionFactor,
    consumption: number
}