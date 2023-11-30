import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { UserCooperativeRequestsService } from '../../services/userCooperative/userCooperativeRequests.service';
import { isAnError } from '../../utils/error';
import { classToPlain } from "class-transformer";



export default function UserCooperativeRequestsRouter(service: UserCooperativeRequestsService): Router {
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

      const result = await service.update(id, data);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json();
    })

    .get('/user/:id/origin/:origin', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id, origin } = req.params;
        const result = await service.getByOrigin(id, origin);
        res.status(StatusCodes.OK).json(classToPlain(result));
      } catch (err) {
        next(err);
      }
    })

    .delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        await service.delete(id);
        res.status(StatusCodes.NO_CONTENT).json();
      } catch (error) {
        next(error);
      }
    });

}
