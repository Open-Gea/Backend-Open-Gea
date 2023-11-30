import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { WeatherForecastService } from '../../services/apiWeather/weatherForecast.service';
import { FarmService } from '../../services/farm/farm.service';
import { YvYError, isAnError } from '../../utils/error';


export default function weatherForecastRouter(service: WeatherForecastService, farmService: FarmService): Router {
  return Router()

    .get('/daily/:date/:farmId/:lang', async (req: Request, res: Response, next: NextFunction) => {

      const { date, farmId , lang } = req.params;

      const farm = await farmService.read(farmId).catch((error: Error) => error);

      if (isAnError(farm)) {
        next(farm);
        return;
      }
      const ubicationJson = JSON.stringify(farm?.ubication);

      const ubicationObj = JSON.parse(ubicationJson);

      const hourlyForecast = await service.getHourlyForecast(date, ubicationObj.lat, ubicationObj.lng , lang).catch((error: YvYError) => error);

      const dailyForecast = await service.getDailyForecast(date, ubicationObj.lat, ubicationObj.lng, lang).catch((error: YvYError) => error);


      if (isAnError(hourlyForecast || dailyForecast)) {
        next(hourlyForecast || dailyForecast);
        return;
      }

      // Combine result and result2 data into a single object
      const combinedResult = {
        hourlyForecast: hourlyForecast,
        dailyForecast: dailyForecast
      };


      res.status(StatusCodes.OK).json(combinedResult);
    })
}
