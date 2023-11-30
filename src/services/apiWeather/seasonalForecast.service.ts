import { Agriculture, WateringNeeds, seasonalFInfo, seasonalFPoint } from "../../models/apiWeather/apiWeather";

const axios = require('axios');

export class SeasonalForecastService {
  constructor() { }
  async seasonalForecastInfo(params: seasonalFInfo): Promise<any> {
    try{
      const payload = {
        products: params.products,
        apiKey : process.env.API_KEY_WEATHER,
      }      
      const response = await axios.get
      ( `https://api.weather.com/v2/tiler/info?meta=false`,{
        params: payload
      });
      
      return response.data;
    } catch(e){
      console.log(e);
    }
  }

  async seasonalForecastPoint(params: seasonalFPoint): Promise<any> {
    try{
      const payload = {
        products: params.products,
        apiKey : process.env.API_KEY_WEATHER,
        lat: params.lat,
        lon: params.lon,
        rt: params.rt,
        t: params.t
      }      
      const response = await axios.get
      ( `https://api.weather.com/v2/tiler/point?format=geojson&method=nearest&meta=false`,{
        params: payload
      });
      
      return response.data;
    } catch(e){
      console.log(e);
    }
  }

  
}
