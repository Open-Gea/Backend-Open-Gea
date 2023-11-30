import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ReportService } from '../../services/utils/report.service';
import { isAnError, YvYError } from '../../utils/error';

export default function reportRouter(service: ReportService): Router {
  return Router()
    .get('/', async (_req: Request, res: Response, next: NextFunction) => {
      const reports = await service.getAll().catch((error:YvYError) => error);
      if (isAnError(reports)) {
        next(reports);
        return;
      }
      res.status(StatusCodes.OK).json(reports);
    })
    .get('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const report = await service.read(id).catch((error:YvYError) => error);
      if (isAnError(report)) {
        next(report);
        return;
      }
      res.status(StatusCodes.OK).json(report);
    })

    .get('/search/:query', async (req: Request, res: Response, next: NextFunction) => {
      const { query } = req.params;
      const report = await service.search(query).catch((error:YvYError) => error);
      if (isAnError(report)) {
        next(report);
      }
      res.status(StatusCodes.OK).json(report);
    })

    .patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const { body } = req;
      const report = await service.update(id, body).catch((error:YvYError) => error);
      if (isAnError(report)) {
        next(report);
      }
      res.status(StatusCodes.OK).json(report);
    })
    .delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const report = await service.delete(id).catch((error:YvYError) => error);
      if (isAnError(report)) {
        next(report);
      }
      res.status(StatusCodes.NO_CONTENT).json();
    })
    .post('/', async (req: Request, res: Response, next: NextFunction) => {
      const { body } = req;
      const report = await service.create(body).catch((error:YvYError) => error);
      if (isAnError(report)) {
        next(report);
        return;
      }
      res.status(StatusCodes.CREATED).json(report);
    });
}
