import axios, { AxiosResponse } from 'axios';

import { StatusCodes } from 'http-status-codes';
import { WeatherData } from '../../models/apiWeather/weatherData';
import { DayForecast } from '../../models/forecast/DayForecast';
import { YvYError } from '../../utils/error';


export class WeatherForecastService {

  constructor() { }

  async getHourlyForecast(day: string, lat: string, lng: string, lang = 'es-ES',format = 'json', units = 'm', ) {
    const WF_HOURLY_URL= process.env.WF_HOURLY_FORECAST || 'https://api.weather.com/v3/wx/forecast/hourly/2day'
    const url = `${WF_HOURLY_URL}?geocode=${lat},${lng}&format=${format}&units=${units}&language=${lang}&apiKey=${process.env.API_KEY_WEATHER}`;
    
    return axios.get(url)
      .then(response => {

        const weatherDataArray: WeatherData[] = response.data;

        const index = this.getSmallestDateIndex(new Date(day), weatherDataArray['validTimeLocal'])

        let data = {
          cloudCover: weatherDataArray['cloudCover'][index],
          dayOfWeek: weatherDataArray['dayOfWeek'][index],
          dayOrNight: weatherDataArray['dayOrNight'][index],
          expirationTimeUtc: weatherDataArray['expirationTimeUtc'][index],
          iconCode: weatherDataArray['iconCode'][index],
          iconCodeExtend: weatherDataArray['iconCodeExtend'][index],
          precipChance: weatherDataArray['precipChance'][index],
          precipType: weatherDataArray['precipType'][index],
          pressureMeanSeaLevel: weatherDataArray['pressureMeanSeaLevel'][index],
          qpf: weatherDataArray['qpf'][index],
          qpfSnow: weatherDataArray['qpfSnow'][index],
          relativeHumidity: weatherDataArray['relativeHumidity'][index],
          temperature: weatherDataArray['temperature'][index],
          temperatureDewPoint: weatherDataArray['temperatureDewPoint'][index],
          temperatureFeelsLike: weatherDataArray['temperatureFeelsLike'][index],
          temperatureHeatIndex: weatherDataArray['temperatureHeatIndex'][index],
          temperatureWindChill: weatherDataArray['temperatureWindChill'][index],
          uvDescription: weatherDataArray['uvDescription'][index],
          uvIndex: weatherDataArray['uvIndex'][index],
          validTimeLocal: weatherDataArray['validTimeLocal'][index],
          validTimeUtc: weatherDataArray['validTimeUtc'][index],
          visibility: weatherDataArray['visibility'][index],
          windDirection: weatherDataArray['windDirection'][index],
          windDirectionCardinal: weatherDataArray['windDirectionCardinal'][index],
          windGust: weatherDataArray['windGust'][index],
          windSpeed: weatherDataArray['windSpeed'][index],
          wxPhraseLong: weatherDataArray['wxPhraseLong'][index],
          wxPhraseShort: weatherDataArray['wxPhraseShort'][index],
          wxSeverity: weatherDataArray['wxSeverity'][index]

        };
        const result = [data];

        return result;

      })
      .catch(error => {
        throw new YvYError('Error', StatusCodes.BAD_REQUEST ,'Error')

      });

  }

  async getDailyForecast(day: string, lat: string, lng: string, lang = 'es-ES', format = 'json', units = 'm') {
    const WF_DAILY_URL= process.env.WF_DAILY_FORECAST || 'https://api.weather.com/v3/wx/forecast/daily/15day'
    const url = `${WF_DAILY_URL}?geocode=${lat},${lng}&format=${format}&units=${units}&language=${lang}&apiKey=${process.env.API_KEY_WEATHER}`;
  
    return axios.get(url)
      .then(response => {
  
        const numDays = response.data.validTimeLocal.length;
        const forecast: DayForecast[] = [];
  
        for (let i = 0; i < numDays; i++) {
          const dayForecast = {
            temperatureMax: response.data.temperatureMax[i],
            temperatureMin: response.data.temperatureMin[i],
            validTimeLocal: response.data.validTimeLocal[i],
            qpf: response.data.qpf[i],
            iconCode: null as number | null,
            wxPhraseLong: null as string | null,
          };
  
          for (const daypart of response.data.daypart) {
            if (daypart.temperature[i] !== null) {
              dayForecast.iconCode = daypart.iconCode[i];
              dayForecast.wxPhraseLong = daypart.wxPhraseLong[i];
              break;
            }
          }
  
          forecast.push(dayForecast);
        }
        
        return forecast;
      })
      .catch(error => {
        throw new YvYError('Error', StatusCodes.BAD_REQUEST, 'Error')
      });
  }
  


  getSmallestDateIndex(dynamicDate: Date, dates: string[]): number {
    let smallestDiff = Number.MAX_SAFE_INTEGER;
    let smallestIndex = -1;

    for (let i = 0; i < dates.length; i++) {
      const currentDate = new Date(dates[i]);

      const diff = Math.abs(currentDate.getTime() - dynamicDate.getTime());

      if (diff < smallestDiff) {
        smallestDiff = diff;
        smallestIndex = i;
      }
    }

    return smallestIndex;
  }


}
