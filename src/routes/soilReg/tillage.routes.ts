import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { TillageService } from '../../services/soilReg/tillage.service';
import { YvYError, isAnError } from '../../utils/error';



export default function tillageRouter(service: TillageService): Router {
  return Router()

    .post('/', async (req: Request, res: Response, next: NextFunction) => {

      const result = await service.create(req.body).catch((error: Error) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.CREATED).json(result);
    })
    .put('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const { data } = req.body;
      const result = await service.update(id, data).catch(
        e => new YvYError(e.message, StatusCodes.BAD_REQUEST, e.message));
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json();
    })
    .delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.delete(id).catch(
        e => new YvYError(e.message, StatusCodes.BAD_REQUEST, e.message));
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json();
    })
    .get('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.findByUserId(id).catch(
        e => new YvYError(e.message, StatusCodes.BAD_REQUEST, e.message));
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json(result);
    });

}
