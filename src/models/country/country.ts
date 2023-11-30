import { BaseObject } from '../utils/common';

export interface Country extends BaseObject {
  name: string,
  englishName: string,
  code: string
}

