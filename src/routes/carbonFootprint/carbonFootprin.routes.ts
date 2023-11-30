import { Router, Request, Response, NextFunction } from "express";

import { isAnError } from "../../utils/error";
import { CarbonFootprintService } from "../../services/carbonFootprint/carbonFootprint.service";
import { log } from "console";

export default function carbonFootprintRouter(service: CarbonFootprintService): Router {
  return Router()
    .post('/', async (req: Request, res: Response, next: NextFunction) => {
      const result = await service.calculateCarbon(req.body);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(200).json(result);
    })
    .get('/', async (req: Request, res: Response, next: NextFunction) => {

      const result = await service.findAll().catch((error: Error) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(200).json(result);
    })
    .delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.delete(id).catch((error: Error) => error);
      if (isAnError(result)) {
        next(result);
      }
      res.status(200).json(result);
    })

    .get('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await service.read(id).catch((error: Error) => error);
      if (isAnError(result)) {
        next(result);
      }
      res.status(200).json(result);
    })

    .get('/farm/:farmId', async (req: Request, res: Response, next: NextFunction) => {
      const { farmId } = req.params;

      try {
        let data = await service.readByFarmId(farmId);


        if (!data) {
          res.status(404).json({ message: "No data found for the provided farm ID" });
          return;
        }


        let latestByYear = {};

        data.forEach(item => {

          if (!latestByYear[item.year] || new Date(item.createdAt) > new Date(latestByYear[item.year].createdAt)) {
            latestByYear[item.year] = item;
          }
        });


        let result = Object.values(latestByYear);

        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    });



}
