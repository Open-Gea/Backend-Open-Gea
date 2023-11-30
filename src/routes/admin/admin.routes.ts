import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AdminService } from '../../services/admin/admin.service';

export default function adminRouter(service: AdminService): Router {

  return Router()
    .get('/users', async (_, res: Response, next: NextFunction) => {
      try {
        const users = await service.search();
        res.status(StatusCodes.OK).json(users);
      } catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
      }
    })

    .get('/users/:countryId', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { countryId } = req.params;
        const users = await service.findByCountry(countryId);
        res.status(StatusCodes.OK).json(users);
      } catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
      }
    })

    .put('/users/:userId/disable', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { userId } = req.params;
        await service.disable(userId, false);
        res.status(StatusCodes.NO_CONTENT).send();
      } catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
      }
    })

    .put('/users/:userId/enable', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { userId } = req.params;
        await service.enable(userId, false);
        res.status(StatusCodes.NO_CONTENT).send();
      } catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
      }
    })

    .get('/users/:userId/status', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { userId } = req.params;
        const isActive = await service.isUserActive(userId);
        res.status(StatusCodes.OK).json({ isActive });
      } catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
      }
    })

    .get('/cooperatives', async (_, res: Response, next: NextFunction) => {
      try {
        const users = await service.getCooperatives();
        res.status(StatusCodes.OK).json(users);
      } catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
      }
    })

    .put('/cooperatives/:cooperativeId/disable', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { cooperativeId } = req.params;
        await service.disable(cooperativeId, true);
        res.status(StatusCodes.NO_CONTENT).send();
      } catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
      }
    })

    .put('/cooperatives/:cooperativeId/enable', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { cooperativeId } = req.params;
        await service.enable(cooperativeId, true);
        res.status(StatusCodes.NO_CONTENT).send();
      } catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
      }
    })

    .get('/cooperatives/:countryId', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { countryId } = req.params;
        const users = await service.getCooperativesByCountry(countryId);
        res.status(StatusCodes.OK).json(users);
      } catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
      }
    })

    .get('/countries', async (_, res: Response, next: NextFunction) => {
      try {
        const countries = await service.getAllCountries();
        res.status(StatusCodes.OK).json(countries);
      } catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
      }
    })

    .get('/countriesList', async (_, res: Response, next: NextFunction) => {
      try {
        const countries = await service.getAllCountriesList();
        res.status(StatusCodes.OK).json(countries);
      } catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
      }
    })

    .get('/countries/:countryId', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { countryId } = req.params;
        const country = await service.getCountry(countryId);
        res.status(StatusCodes.OK).json(country);
      } catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
      }
    })

    .post('/countries', async (req: Request, res: Response, next: NextFunction) => {
      try {

        const result = await service.createCountry(req.body);

        res.status(StatusCodes.OK).json(result);


      } catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
      }
    })

    .patch('/countries/:id', async (req: Request, res: Response, next: NextFunction) => {

      try {
        const { id } = req.params;

        const result = await service.updateCountry(id, req.body);

        res.status(StatusCodes.NO_CONTENT).json(result);

      } catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
      }

    })

    .delete('/countries/:id', async (req: Request, res: Response, next: NextFunction) => {

      try {
        const { id } = req.params;
        const result = await service.deleteCountry(id);
        res.status(StatusCodes.NO_CONTENT).json(result);

      } catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
      }
    });

}
