import { NextFunction, Request, Response, Router } from "express";

import { FarmService } from "../../services/farm/farm.service";
import { isAnError } from "../../utils/error";
import multer from "multer";
import { EvaluationSevice } from "../../services/waterFootprint/evaluation.service";
import { CarbonFootprintService } from "../../services/carbonFootprint/carbonFootprint.service";

export default function farmRouter(
  service: FarmService,
  evaluationService: EvaluationSevice,
  carbonFootPrintService: CarbonFootprintService,
): Router {
  const upload = multer();
  interface CustomRequest extends Request {
    file?: any; 
  }

  return Router()
      
    .get("/", async (req: Request, res: Response, next: NextFunction) => {
      const result = await service.getAll().catch((error: Error) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(200).json(result);
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

    .get("/user/:userId",async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        const result = await service.getAllByUserId(userId).catch((error: Error) => error);
        if (isAnError(result)) {
          next(result);
          return;
        }
        res.status(200).json(result);
      }
    )

    .put("/:id",upload.single("urls"),async (req: CustomRequest, res, next) => {
        const { id } = req.params;
        const result = await service.update(id, req.body, req, res).catch((error: Error) => error);
        if (isAnError(result)) {
          next(result);
          return;
        }
        res.status(200).json(result);
      }
    )

    .post("/", upload.single("urls"), async (req: CustomRequest, res, next) => {
      const result = await service
        .create(req.body, req, res)
        .catch((error: Error) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(201).json(result);
    })

    .delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const deleteEvaluations = await evaluationService
        .deleteByFarm(id)
        .catch((error: Error) => error);
      if (isAnError(deleteEvaluations)) {
        next(deleteEvaluations);
        return;
      }
      const deleteCarbonFootprint = await carbonFootPrintService
        .deleteByFarm(id)
        .catch((error: Error) => error);
      if (isAnError(deleteCarbonFootprint)) {
        next(deleteCarbonFootprint);
        return;
      }
      const result = await service.delete(id).catch((error: Error) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(204).json(result);
    });
}
