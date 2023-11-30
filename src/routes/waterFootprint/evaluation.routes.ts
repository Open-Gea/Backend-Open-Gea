import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { EvaluationSevice } from '../../services/waterFootprint/evaluation.service';
import { isAnError, YvYError } from '../../utils/error';

export default function evaluationRouter(service: EvaluationSevice): Router {
  return Router()
    .post('/', async (req: Request, res: Response, next: NextFunction) => {
      const item = req.body;
      const result = await service.create(item).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(201).json(result);
    })
    .get('/', async (req:Request, res: Response, next:NextFunction) => {
      if (req.query.filter && req.query.filterType) {
        const filter = req.query.filter.toString();
        const filterType = req.query.filterType.toString();
        const result = await service.findByFilter(filter, filterType);
        if (isAnError(result)) {
          next(result);
          return;
        }
        return res.json(result);
      }
      const evaluations = await service.findAll();
      return res.json(evaluations);
    })
    .get('/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      const evaluation = await service.read(id);
      return res.json(evaluation);
    })
    .patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.update(id, req.body).catch((error:YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      return res.status(StatusCodes.NO_CONTENT).json();
    })
    .patch('/updateToAccepted/:id', async (req:Request, res:Response, next:NextFunction) => {
      if (!req.query.status) {
        return res.status(StatusCodes.BAD_REQUEST);
      }
      const { id } = req.params;
      const status = req.query.status.toString();
      const result = await service.acceptOrReject(id, status).catch((error:YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      return res.status(StatusCodes.ACCEPTED);
    })
    .delete('/:id', async (req:Request, res:Response, next:NextFunction) => {
      const { id } = req.params;
      const result = await service.delete(id).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
      }
      return res.status(StatusCodes.NO_CONTENT).json();
    })
    .get('/user/:id/farm/:farmId', async (req: Request, res: Response) => {
      const { id , farmId } = req.params;
      const evaluation = await  service.findByUserAndFarm(id,farmId );
      return res.json(evaluation);
    })

    .get('/year/:year/user/:userId/farm/:farmId/', async (req: Request, res: Response) => {
      const { year, farmId , userId } = req.params;
      const evaluation = await  service.findByYear(year, farmId, userId );
      return res.json(evaluation);
    }); 
}
