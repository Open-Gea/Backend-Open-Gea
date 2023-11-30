import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CropCoefficientService } from '../../services/waterFootprint/cropCoefficient.service';
import { BaseError, isAnError, YvYError } from '../../utils/error';

export default function cropCoefficientRouter(
  service: CropCoefficientService
): Router {
  return Router()
    .get('/', async (req: Request, res: Response, next: NextFunction) => {
      const { name, category } = req.query;
      const query = name || category;
      const result = await service
        .search(query ? String(query) : undefined)
        .catch((error: YvYError) => error);

      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(200).json(result);
    })
    .post('/', async (req: Request, res: Response, next: NextFunction) => {
      const result = await service
        .add(req.body)
        .catch((error: BaseError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json(result);
    })
    .get('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.read(id).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(200).json(result);
    })
    .patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service
        .update(id, req.body)
        .catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.NO_CONTENT).json();
    })
    .delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.delete(id).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.NO_CONTENT).json();
    });
}
