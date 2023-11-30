import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isAnError, YvYError } from '../../utils/error';
import { QuestionsAutodiagService } from '../../services/autodiag/questionAutodiag.service';

export default function  questionAutodiagRouter(service: QuestionsAutodiagService): Router {
  return Router()
    .get('/', async (req: Request, res: Response, next: NextFunction) => {
      const questions = await service.search();
      res.json(questions);
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
      res.status(StatusCodes.OK).json();
    })
    .post('/', async (req: Request, res: Response, next: NextFunction) => {
      const item = req.body;
      const result = await service.create(item).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.sendStatus(StatusCodes.CREATED);
    });
}
