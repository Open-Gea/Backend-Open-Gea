import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { SettingQrService } from '../../services/qr/settingQr.service';
import { isAnError } from '../../utils/error';


export default function settingQrRouter(service: SettingQrService): Router {
    return Router()

    .get('/user/:id/farm/:farmId', async (req: Request, res: Response, next: NextFunction) => {
        const { id, farmId } = req.params;

        const result = await service.getAllByUserId(id, farmId).catch((error: Error) => error);

        if (isAnError(result)) {
            next(result);
            return;
        }
        if (result === null) {
            res.status(200).json([]);
        } else {
            res.status(200).json(result);
        }
    })
        .get('/:id', async (req: Request, res: Response, next: NextFunction) => {
            const { id } = req.params;

            const result = await service.read(id).catch((error: Error) => error);

            if (isAnError(result)) {
                next(result);
                return;
            }
            if (!result) {
                res.status(404).json({ message: 'Resource not found' });
                return;
            }

            res.status(200).json(result);
        })


        .post('/', async (req: Request, res: Response, next: NextFunction) => {
            const { id_setting } = req.body;

            let result;
            if (id_setting) {
                const result = await service.delete(id_setting);
            }
            result = await service.create(req.body).catch((error: Error) => error);

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
        });
}