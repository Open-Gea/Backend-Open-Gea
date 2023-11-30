import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ProductService } from '../../services/product/product.service';
import { isAnError } from '../../utils/error';

export default function productsRouter(service: ProductService): Router {
  return Router()
    .get('/', async (req: Request, res: Response, next: NextFunction) => {
      const filter = req.query.filter?.toString();
      const result = await service.search(filter);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json(result);
    })
    .post('/', async (req: Request, res: Response, next: NextFunction) => {
      const result = await service.create(req.body).catch((error: Error) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.CREATED).json(result);
    })
    .patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const { data } = req.body;
      const result = await service.update(id, data);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.NO_CONTENT).json();
    })
    .delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.delete(id);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.NO_CONTENT).json();
    })
    .get('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.read(id);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json(result);
    });
}
