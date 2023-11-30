import { Daypart } from "./Daypart";

export interface ApiResponse {
    temperatureMax: number[];
    temperatureMin: number[];
    validTimeLocal:string[];
    daypart: Daypart[];
  }
  