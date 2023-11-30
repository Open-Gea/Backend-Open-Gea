import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CropManagementService } from '../../services/soilReg/cropManagement.service';
import { isAnError } from '../../utils/error';

export default function CropManagementRouter(service: CropManagementService): Router {
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
      const data = req.body; 
      const result = await service.update(id, data);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json();
    })
    .delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.delete(id);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json();
    })
    .get('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.findByUserId(id);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json(result);
    });
}
