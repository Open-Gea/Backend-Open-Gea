import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isAnError, YvYError } from '../../utils/error';
import multer from "multer";
import { AnswersAutodiagService } from '../../services/autodiag/answerAutodiag.service';

export default function answerAutodiagRouter(service: AnswersAutodiagService): Router {
  const upload = multer();
  interface CustomRequest extends Request {
    files?: any; 
  }

  return Router()
    .get('/user/:userId/:farmId', async (req: Request, res: Response) => {
      const {userId, farmId } = req.params;
      const answers = await service.getUserAnswers(userId, farmId).catch((error: YvYError) => error);
      res.json(answers);
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
    .post('/', async (req, res, next: NextFunction) => {
      const requestData: {
        answers: { [questionId: string]: string };
        user: string;
        farm: string;
      } = req.body;
    
      const { answers, user, farm } = requestData;      
      try {
        const crearRespuesta = async (questionId: string, answer: string) => {
          const item = { user, farm, answer };
          const result = await service.create(item).catch((error) => error);
          return result;
        };
    
        const promises: Promise<any>[] = [];
        for (const questionId in answers) {
          const answer = answers[questionId];
          const promise = crearRespuesta(questionId, answer);
          promises.push(promise);
        }
    
        const results = await Promise.all(promises);
        res.status(StatusCodes.OK).json('Created');
      } catch (error) {
        next(error);
      }
    })
    .post('/files', upload.any(), async(req:CustomRequest, res, next: NextFunction) => {
      const { userId, farmId } = req.body;
      const files = req.files;
    
      const asyncForEach = async (array: any[], callback: (item: any, index: number, array: any[]) => Promise<void>) => {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      };
    
      try {
        await asyncForEach(files, async (file) => {
          const questionId = file.fieldname;
          const fileData = {
            filename: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            buffer: file.buffer, 
          };
          const result = await service.uploadFile(questionId, userId, farmId, fileData).catch((error: YvYError) => error);
          if (isAnError(result)) {
            next(result);
            return;
          }
        });
    
        res.status(200).json({ message: 'Archivos recibidos correctamente' });
      } catch (error) {
        next(error);
      }
    });
}
