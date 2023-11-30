import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseError, isAnError, YvYError } from '../../utils/error';
import { CooperativesService } from '../../services/userCooperative/cooperatives.service';
import multer from 'multer';
import Validator from 'jsonschema';
import { cooperativeSchema } from '../../schemas/userCooperative/cooperative.schema';
const upload = multer({ storage: multer.memoryStorage() });

export default function cooperativesRouter(service: CooperativesService): Router {
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
    .post('/', upload.single('profile_picture'), async (req: Request, res: Response, next: NextFunction) => {
      const validation = Validator.validate(req.body, cooperativeSchema);

      if (!validation.valid) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid request body',
          errors: validation.errors.map((error) => error.stack),
        });
      } else {
        const result = await service.create(req.body, req.file).catch((error: BaseError) => error);

        if (isAnError(result)) {
          next(result);
          return;
        }
        res.status(StatusCodes.OK).json(result);
      }
    })
    .put('/:id', upload.single('profile_picture'), async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.updateWithProfilePicture(id, req.body, req.file).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.NO_CONTENT).json();
    })

    .post('/acceptTermsConditionsCooperative', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.body;
      const result = await service.acceptTermsConditionsCooperative(id).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json({ ok: true });
    })
    .patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const { data } = req.body;
      const result = await service.update(id, data).catch(e => e.message);;
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.NO_CONTENT).json();
    })
    .delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.delete(id).catch(e => e.message);;
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.NO_CONTENT).json();
    })
    .get('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.read(id).catch(e => e.message);;
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json(result);
    })
    .get('/users/getUsers/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.getUsers(id).catch(e => e.message);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json(result);
    })
    .get('/users/getCooperatives/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.getCooperativesByUser(id).catch(e => e.message);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json(result);
    })
    .get('/users/getFarms/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.getAllFarms(id).catch(e => e.message);;
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json(result);
    })
    .get('/users/carbonFootprint/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.getCarboonFootprint(id).catch(e => e.message);;
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json(result);
    })
    .get('/users/waterFootprint/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.getWaterFootprint(id).catch(e => e.message);;
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json(result);
    })
    .post('/users/addUser', async (req: Request, res: Response, next: NextFunction) => {
      const { id, userId } = req.body;
      const result = await service.addUser(id,userId).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json(result);
    })
    .delete('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.removeUser(id).catch(e => e.message);;
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json(result);
    })

    .get('/email/:email', async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.params;
      const result = await service.findByEmail(email).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(200).json(result);
    });
}
