import { BaseObject } from '../utils/common';

export interface Lot extends BaseObject {
  farmId: string;
  name: string;
  surface: string;
  ubication: object;
  notes: string;
}
