import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { GWPService } from '../../services/utils/gwp.service';
import { isAnError, YvYError } from '../../utils/error';

export default function GWPRouter(service: GWPService): Router {
  return Router()
    .get('/', async (req: Request, res: Response, next: NextFunction) => {
      if (req.query.name) {
        const name = req.query.name.toString();
        const gwp = await service.findByName(name).catch((error: YvYError) => error);
        if (isAnError(gwp)) {
          next(gwp);
          return;
        }
        res.json(gwp);
        return;
      }
      const gwps = await service.search();
      res.json(gwps);
    })
    .get('/:id', async (req: Request, res: Response) => {
      const gwp = await service.findById(req.params.id);
      res.json(gwp);
    })
    .patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.update(id, req.body).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.sendStatus(StatusCodes.NO_CONTENT);
    })
    .delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.delete(id).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.NO_CONTENT).json();
    })
    .post('/', async (req: Request, res: Response, next: NextFunction) => {
      const item = req.body;
      const result = await service.create(item).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.sendStatus(StatusCodes.NO_CONTENT);
    });
}
