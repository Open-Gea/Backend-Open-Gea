import { BaseObject, ExtensibleObject } from '../utils/common';

export interface Product extends BaseObject {
  name: string
  category: string
  description: string
  crop_stages: {
    dev: number
    init: number
    late: number
    mid: number
  }
  crop_kc: {
    init: number
    mid: number
    end: number
  }
}
