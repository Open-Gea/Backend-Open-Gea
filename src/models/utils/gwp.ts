import { BaseObject, ExtensibleObject } from './common';

export interface GWP extends BaseObject{
  name: string,
  formula: string,
  value: number
}
