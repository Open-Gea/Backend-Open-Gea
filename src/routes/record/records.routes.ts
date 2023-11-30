import { NextFunction, Request, Response, Router } from "express";
import { RecordService } from "../../services/record/record.service";
import { GeneralInfo } from "../../models/records/generalInfo";
import { isAnError } from "../../utils/error";
import { StatusCodes } from "http-status-codes";
import multer from "multer";
import { processFiles } from "../../middlewares/processFiles.middleware";


const upload = multer();
            

export default function recordsRouter<T> (service: RecordService<T>) : Router{
    return Router()
    
      .get('/:id', async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const result = await service.read(id).catch((error: Error) => error);
        if (isAnError(result)) {
          next(result);
          return;
        }
        res.status(StatusCodes.OK).json(result);
      })

     .get('/', async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.query;
        
        const result = userId ? 
                      await service.getAllByUser(userId as string).catch((error: Error) => error) : 
                      await service.search().catch((error: Error) => error);         
        
        if (isAnError(result)) {
          next(result);
          return;
        }
        res.status(StatusCodes.OK).json(result);
        
      })

      .post('/', upload.array('files[]'), processFiles, async (req: Request, res: Response, next: NextFunction) => {
        const result = await service.create(req.body).catch((error: Error) => error);
        if (isAnError(result)) {
          next(result);
          return;
        }
        res.status(StatusCodes.CREATED).json(result);
      })

      .patch('/:id', upload.array('files[]'), processFiles, async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const result = await service.update(id, req.body).catch((error: Error) => error);
        if (isAnError(result)) {
          next(result);
          return;
        }
        return res.status(StatusCodes.OK).json(result);
      })
      
      .delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const result = await service.softDelete(id).catch((error: Error) => error);
        if (isAnError(result)) {
          next(result);
          return;
        }
        return res.status(StatusCodes.NO_CONTENT).json(result);
      });

}