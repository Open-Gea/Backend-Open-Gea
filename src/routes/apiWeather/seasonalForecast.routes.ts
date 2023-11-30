import { NextFunction, Request, Response, Router } from 'express';
import { isAnError } from '../../utils/error';
import { SeasonalForecastService } from '../../services/apiWeather/seasonalForecast.service';

export default function seasonalForecastRouter(service: SeasonalForecastService): Router {
  return Router()
    .post('/info', async (req: Request, res: Response, next: NextFunction) => {
      const result = await service.seasonalForecastInfo(req.body).catch((error: Error) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(200).json(result);
    })
    .post('/point', async (req: Request, res: Response, next: NextFunction) => {
      const result = await service.seasonalForecastPoint(req.body).catch((error: Error) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(200).json(result);
    })
}
