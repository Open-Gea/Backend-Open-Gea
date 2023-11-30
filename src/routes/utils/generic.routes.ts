import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { GenericService } from "../../services/utils/generic.service";
import { isAnError } from "../../utils/error";



import express from 'express';

class GenericRouter<T>  {
  public router: Router = express.Router();

  constructor(private service: GenericService<T>) {
    this.router.get('/:id', this.getById.bind(this));
    this.router.get('/', this.getAll.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.patch('/:id', this.update.bind(this));
    this.router.delete('/:id', this.delete.bind(this));
  }


  protected async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
        const result = await this.service.read(id).catch((error: Error) => error);
        if (isAnError(result)) {
          next(result);
          return;
        }
        res.status(StatusCodes.OK).json(result);
  }

  protected async getAll(req: Request, res: Response, next: NextFunction) {
        
        const result = await this.service.search().catch((error: Error) => error);         
        
        if (isAnError(result)) {
          next(result);
          return;
        }
        res.status(StatusCodes.OK).json(result);
  }

  protected async create(req: Request, res: Response, next: NextFunction) {
    const result = await this.service.create(req.body).catch((error: Error) => error);
        if (isAnError(result)) {
          next(result);
          return;
        }
        res.status(StatusCodes.CREATED).json(result);
  }

  protected async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
        const result = await this.service.update(id, req.body).catch((error: Error) => error);
        if (isAnError(result)) {
          next(result);
          return;
        }
        return res.status(StatusCodes.OK).json(result);
  }

  protected async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
        const result = await this.service.delete(id).catch((error: Error) => error);
        if (isAnError(result)) {
          next(result);
          return;
        }
        return res.status(StatusCodes.NO_CONTENT).json(result);
  }
}

export default GenericRouter;
