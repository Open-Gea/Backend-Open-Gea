
import axios from 'axios';
import * as pyeto from './pyetoLibrary';
import * as math from 'mathjs';
import { log } from 'console';

interface Data {
  georef: {
    lat: number;
    lon: number;
  };
  crop: {
    Name: string;
    Category: string;
    start: string;
    end: string;
  };
  crop_stages: {
    init: string;
    dev: string;
    mid: string;
    late: string;
  };
  crop_kc: {
    init: number;
    mid: number;
    End: number;
  };
}

interface WeatherData {
  date: string;
  prcp: number | null;
}

interface DailyPPE {
  [date: string]: number;
}

interface DailyETCResponse {
  etc: number[];
  days: string[];
}

interface KCMaskResponse {
  [key: string]: number;
}

interface HHResponse {
  etc: number;
  rr: number;
}

interface DailyRRResponse {
  [key: string]: number;
}

let dataWeather;

export async function etc(data: Data) {
  const georef = data.georef;
  const crop = data.crop;
  const crop_stages = data.crop_stages;
  const eto = await get_eto(georef.lat, georef.lon, crop.start, crop.end);
  const kc = data.crop_kc;
  const mask = kc_mask(crop_stages, kc);
  const res = daily_etc(eto, mask);
  const daily_ppe = await get_daily_ppe(georef.lat, georef.lon, crop.start, crop.end);
  
  const daily_rr = get_daily_rr(res, daily_ppe);
  res["ppe"] = daily_ppe;
  res["hh-blue"] = daily_rr;
  return res;
}

async function get_eto(lat: number, lon: number, start: string, end: string): Promise<{[key: string]: number}> {
  const result= await weather_request(lat, lon, start, end); 
  const data = result.data;
  
  const response: {[key: string]: number} = {};

  for (const value of data) {
      const day = value["date"].split("-");
      const t_min = value["tmin"];
      const t_max = value["tmax"];
      const t_avg = value["tavg"];

      try {
          var res = daily_eto(t_min, t_max, lat, day);
      } catch {
          res = -1;
      }

      const key = `${day[0]}-${day[1]}-${day[2]}`;
      response[key] = res;
  }

  const completedResponse = complete_eto(response);
  return completedResponse;
}

function daily_eto(t_min: number, t_max: number, lat: number, day: [number, number, number]): number {
  lat = pyeto.deg2rad(lat); // deg2rad: converts from degrees to radians
  const day_of_year = new Date(day[0], day[1] - 1, day[2]).getDay(); // get the day of the year
  const sol_dec = pyeto.sol_dec(day_of_year); // sol_dec: calculates the solar declination for that specific day of the year
  const sha = pyeto.sunset_hour_angle(lat, sol_dec); // sunset_hour_angle: calculates the sunset hour angle from the latitude in radians and solar declination
  const ird = pyeto.inv_rel_dist_earth_sun(day_of_year); // inv_rel_dist_earth_sun: Calculate the inverse relative distance between the earth and sun from the day of the year.
  const et_rad = pyeto.et_rad(lat, sol_dec, sha, ird); // et_rad: Estimate the radiation at the top of the atmosphere.
  const t_avg = (t_max + t_min) / 2.0;
  const res = pyeto.hargreaves(t_min, t_max, t_avg, et_rad); // hargreaves:
  return res;
}

function complete_eto(data: {[key: string]: number}): {[key: string]: number} {
  const keys = Object.keys(data);
  const eto: number[] = [];

  for (const k of keys) {
    eto.push(data[k]);
  }

  if (eto[0] === -1) {
    for (const e of eto) {
      if (e !== -1) {
        eto[0] = e;
        break;
      }
    }
  }

  for (let e = 1; e < eto.length - 1; e++) {
    if (eto[e] === -1) {
      if (eto[e-1] !== -1 && eto[e+1] !== -1) {
        eto[e] = (eto[e+1] + eto[e-1])/2.0;
      } else if (eto[e-1] !== -1 && eto[e+1] === -1) {
        eto[e] = eto[e-1];
      } else if (eto[e-1] === -1 && eto[e+1] !== -1) {
        eto[e] = eto[e+1];
      }
    }
  }

  if (eto[eto.length - 1] === -1) {
    eto[eto.length - 1] = eto[eto.length - 2];
  }

  for (let i = 0; i < eto.length; i++) {
    data[keys[i]] = eto[i];
  }

  return data;
}

async function get_daily_ppe(lat: number, lon: number, start: string, end: string): Promise<DailyPPE> {
  const result= await weather_request(lat, lon, start, end); 
  const data = result.data;
  
  const meses: WeatherData[][] = [];
  while (data.length > 0) {
    meses.push(data.slice(0, 30));
    data.splice(0, 30);
  }
  const daily_ppe: DailyPPE = {};
  for (const mes of meses) {
    let ppt = 0;
    for (const pp of mes) {
      if (pp['prcp'] != null) {
        ppt += pp['prcp'];
      }
    }
    for (const pp of mes) {
      if (pp['prcp'] != null) {
        if (ppt < 70) {          
          if (0.6 * pp['prcp'] - 10 >= 0) {
            daily_ppe[pp['date']] = 0.6 * pp['prcp'] - 10;
          } else {
            daily_ppe[pp['date']] = 0;
          }
        }
        if (ppt > 70) {
          if (0.8 * pp['prcp'] - 24 >= 0) {
            daily_ppe[pp['date']] = 0.8 * pp['prcp'] - 24;
          } else {
            daily_ppe[pp['date']] = 0;
          }
        }
      }
    }
  }
  return daily_ppe;
}

function daily_etc(eto: { [key: string]: number }, mask: number[]): DailyETCResponse {
  const eto_original = eto;
  const etoList: number[] = [];
  const daysData: string[] = [];
  for (const k in eto_original) {
    etoList.push(eto_original[k]);
    daysData.push(k);
  }
  const n_eto = etoList.length;
  const n_mask = mask.length;
  const etc: number[] = [];
  for (let i = 0; i < n_eto; i++) {
    const eto_daily = etoList[i];
    const mask_daily = i < n_mask ? mask[i] : mask[n_mask - 1];
    const etc_daily = eto_daily * mask_daily;
    etc.push(etc_daily);
  }
  const response: DailyETCResponse = {
    etc: etc,
    days: daysData,
  };
  return response;
}

function kc_mask(crop_stages: { [key: string]: string }, kc: { [key: string]: string | number }): number[] {
  const total_days = parseInt(crop_stages["init"]) + parseInt(crop_stages["dev"]) + parseInt(crop_stages["mid"]) + parseInt(crop_stages["late"]);
  const r1 = [0, parseInt(crop_stages["init"])];
  const r2 = [r1[1], r1[1] + parseInt(crop_stages["dev"])];
  const r3 = [r2[1], r2[1] + parseInt(crop_stages["mid"])];
  const r4 = [r3[1], r3[1] + parseInt(crop_stages["late"])];

  const ideal_days = Array.from({ length: total_days }, (_, i) => {
    let kc_day = 0;
    if (i >= r1[0] && i < r1[1]) {
      kc_day = Number(kc["init"]);
    } else if (i >= r2[0] && i < r2[1]) {
      const ref = i - r2[0];
      const m = (Number(kc["mid"]) - Number(kc["init"])) / parseFloat(crop_stages["dev"]);
      const n = Number(kc["init"]);
      kc_day = ref * m + n;
    } else if (i >= r3[0] && i < r3[1]) {
      kc_day = Number(kc["mid"]);
    } else if (i >= r4[0] && i <= r4[1]) {
      const ref = i - r4[0];
      const m = (Number(kc["end"]) - Number(kc["mid"])) / parseFloat(crop_stages["late"]);
      const n = Number(kc["mid"]);
      kc_day = ref * m + n;
    }
    return kc_day;
  });
  return ideal_days;
}

export function HH(data: DailyETCResponse, tonaladas_hectareas: number): { etc: number, rr: number, ppet: number } {
  const suma_etc = data["etc"].reduce((acc, curr) => acc + curr, 0)* 10/ tonaladas_hectareas;
  const values : Array<number>= Object.values(data['hh-blue'])
  const array = {
    'hh-blue': values
  };
  const ppe_values: Array<number> = Object.values(data["ppe"]);
  const suma_rr = array['hh-blue'].reduce((acc, curr) => acc + curr, 0)* 10/ tonaladas_hectareas;
  const suma_ppe = ppe_values.reduce((acc, curr) => acc + curr, 0)* 10/ tonaladas_hectareas;
  const hh = {
    etc: suma_etc,
    rr: suma_rr,
    ppet: suma_ppe
  };
  
  return hh;
}

function get_daily_rr(res: { etc: number[] }, daily_ppe: { [key: string]: number }): { [key: string]: number } {
  const list_etc: number[] = [...res['etc']];
  const daily_rr: { [key: string]: number } = {};
  let cont = 0;
  for (const ppe in daily_ppe) {
    if (list_etc[cont] >= daily_ppe[ppe]) {
      daily_rr[ppe] = list_etc[cont] - daily_ppe[ppe];
    } else {
      daily_rr[ppe] = 0;
    }
    cont++;
  }
  return daily_rr;
}

async function weather_request(lat:number,lon:number,dateStart:string,dateEnd:string){
  try{
    const API_KEY = process.env.API_KEY_METEOSTAT;
    const stationId = await getStation(lat,lon);
    const options = {
      method: 'GET',
      url: process.env.METEOSTAT_STATIONS,
      params: {station: stationId.data[0].id, start: dateStart, end: dateEnd},
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
      }
    };
    
    const result = await axios.request(options);
    return result.data; 
  } catch(e){
    console.log(e);
    return e;
  }
}


async function getStation(lat:number,lon:number){
try{

  const API_KEY = process.env.API_KEY_METEOSTAT;
  const options = {
    method: 'GET',
    url: process.env.METEOSTAT_STATIONS_NEARBY,
    params: {
      lat: lat,
      lon: lon,
      limit: '1',
      radius: '100000000000000000'
    },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
    }
  };
  
  const result = await axios.request(options);
  return result.data; 
} catch(e){
  console.log(e);
  return e;
}
}