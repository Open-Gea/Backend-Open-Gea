import { BaseObject } from '../utils/common';

export interface Farm extends BaseObject {
  userId: string
  name: string
  owner: string
  telephone: string
  country: string
  ubication: object
  totalSurface: string
  infrastructure: string
  perimetralFence: string
  urls: urls[] | null;
}

export interface urls {
  filename: string,
  file_id: string,
  size: number,
  url: string
  fechaCarga:string
}
