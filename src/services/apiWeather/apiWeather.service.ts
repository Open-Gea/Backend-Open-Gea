import { log } from "console";
import { Agriculture, WateringNeeds, seasonalFInfo, seasonalFPoint } from "../../models/apiWeather/apiWeather";

import axios from 'axios';

export class ApiWeatherService {
  constructor() { }

  async apiWeatherWateringNeeds(params: WateringNeeds ): Promise<any> {
    try{

      const response = await axios.get(`${process.env.WEATHER_NEEDS_15}?geocode=${params.geocode.lat},${params.geocode.lng}&language=${params.language}&format=json&apiKey=${process.env.API_KEY_WEATHER}`);
      
      return response.data;

    } catch(e){
      console.log(e);
    }
  }

  async apiWeatherAgriculture(params: Agriculture): Promise<any> {
    try{
      const payload = {
        geocode : `${params.geocode.lat},${params.geocode.lng}`,
        apiKey : process.env.API_KEY_WEATHER,
        crop: params.crop,
        soilDepth: params.soilDepth
      }      
      const response = await axios.get
      ( `${process.env.WEATHER_FORECAST_AGRICULTURE_15}?language=${params.language}&format=json&units=m`,{
        params: payload
      });
      
      return response.data;
    } catch(e){
      console.log(e);
    }
  }
  
}
