import { NextFunction, Request, Response, Router } from 'express';
import { ApiWeatherService } from '../../services/apiWeather/apiWeather.service';
import { isAnError } from '../../utils/error';

export default function apiWeatherRouter(service: ApiWeatherService): Router {
  return Router()
    .post('/wateringNeeds', async (req: Request, res: Response, next: NextFunction) => {
      const result = await service.apiWeatherWateringNeeds(req.body).catch((error: Error) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(200).json(result);
    })
    .post('/agriculture', async (req: Request, res: Response, next: NextFunction) => {
      const result = await service.apiWeatherAgriculture(req.body).catch((error: Error) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(200).json(result);
    })
    
}
