import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { requireRole } from '../../middlewares/authorization.middleware';
import { UserRole } from '../../models/user/user';
import { UserService } from '../../services/user/user.service';
import { isAnError, YvYError } from '../../utils/error';
import { Media } from '../../models/utils/media';
import { MediaService } from '../../services/utils/media.service';
import multer from 'multer';


const upload = multer({ storage: multer.memoryStorage() });

export default function usersRouter(service: UserService, mediaService: MediaService): Router {
  return Router()
    .get('/', async (_, res: Response) => {
      const users = await service.search();
      res.status(200).json(users);
    })
    
    .get("/:id", async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const result = await service.read(id).catch((error: Error) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }      
      res.status(200).json(result);
    })
    .put('/:id', upload.single('profile_picture'), async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.update(id, req.body, req.file).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.NO_CONTENT).json();
    })
    .delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.delete(id).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.NO_CONTENT).json();
    })
    // Only admins can disable users
    .post('/disable/:id', requireRole(UserRole.ADMIN), async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.disable(id).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.NO_CONTENT).json();
    })
    // Accept terms and conditions
    .post('/acceptTermsConditions', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.body;
      const result = await service.acceptTermsConditions(id).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json({ ok: true });
    })
    .post('/conditions', async (req: Request, res: Response, next: NextFunction) => {
      const result = await service.updateAcceptedTermsConditionsForActiveUsers().catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json({ ok: true });
    })

    .post('/media/:id', upload.array('media'), async (req: Request, res: Response, next: NextFunction) => {
      try {

        const { id } = req.params;

        // Check if req.files is defined
        if (!req.files) {
          res.status(StatusCodes.BAD_REQUEST).json({ message: 'No files were uploaded.' });
          return;
        }

        // Process the uploaded files and create Media objects
        const mediaItems: Media[] = (req.files as Express.Multer.File[]).map((file) => {
          const fileType = file.mimetype.startsWith('image/') ? 'image' : 'video';
          return {
            type: fileType,
            user_id: id,
            file_data: file.buffer,
          };
        });

        await mediaService.deleteAllByUserId(id);

        const createdMediaItems = await Promise.all(mediaItems.map(item => mediaService.create(item)));

        res.status(StatusCodes.OK).json({ message: 'Media files uploaded successfully.' });
      } catch (error) {
        next(error);
      }
    })
    .get('/media/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await mediaService.getAllByUserId(id).catch((error: YvYError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(200).json(result);
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
