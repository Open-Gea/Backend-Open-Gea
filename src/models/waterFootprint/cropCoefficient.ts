import { BaseObject, ExtensibleObject } from '../utils/common';

export interface CropCoefficient extends BaseObject {
  name: string;
  category: string;
  init: string;
  end: string;
  mid: string;
}
