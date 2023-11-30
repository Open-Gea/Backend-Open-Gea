import { BaseObject, ExtensibleObject } from '../utils/common';

export interface EmissionFactor extends BaseObject {
  category: string;
  name: string;
  emission_factor: string;
  formula: string;
  unit: string;
  countries: Array<string>;
  years: Array<number>;
}
