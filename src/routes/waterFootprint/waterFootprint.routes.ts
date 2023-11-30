import { Router, Request, Response, NextFunction } from "express";
import { WaterFootprintService } from "../../services/waterFootprint/waterFootprint.service";
import { isAnError } from "../../utils/error";

export default function waterFootprintRouter(service: WaterFootprintService): Router {
  return Router()
    .post('/calculate', async (req: Request, res: Response, next: NextFunction) => {
      const result = await service.calculateFootPrint(req.body);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(200).json(result);
    })
    
}
