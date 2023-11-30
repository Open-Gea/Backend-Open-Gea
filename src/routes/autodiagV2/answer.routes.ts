import express, { NextFunction, Request, Response, Router } from "express";
import { AnswerAutodiagV2 } from "../../models/autodiagV2/answer";
import GenericRouter from "../utils/generic.routes";
import AnswerAutodiagServiceV2  from "../../services/autodiagV2/answer.service";
import { isAnError } from "../../utils/error";
import { StatusCodes } from "http-status-codes";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import multer from "multer";
import { processFiles } from "../../middlewares/processFiles.middleware";

class AnswerAutodiagRouter extends GenericRouter<AnswerAutodiagV2>{
    public router: Router = express.Router();

    constructor(private answerService: AnswerAutodiagServiceV2){
        super(answerService);
        const upload = multer();
        this.router.get('/', this.getAll.bind(this));
        this.router.post('/',upload.array('files[]'), processFiles ,super.create.bind(this));
        this.router.patch('/:id',upload.array('files[]'), processFiles ,super.update.bind(this));
        this.router.get('/by-categories', this.getAllGroupByCategory.bind(this))
        this.router.get('/:id', super.getById.bind(this));
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
    
        const { userId, rule, farmId } = req.query;
        let result = {}
        if(rule) result = await this.answerService.getAllByUserByRule(userId as string, rule as string, farmId as string).catch((error: Error) => error);
        else result = await this.answerService.getAllByUser(userId as string).catch((error: Error) => error);
        
        if (isAnError(result)) {
            next(result);
            return;
        }
        res.status(StatusCodes.OK).json(result);
    }

    async getAllGroupByCategory(req: Request, res: Response, next: NextFunction) {
        const { userId, rule, farmId } = req.query;
        
        const result = await this.answerService.getAnswersGroupByCategory(userId as string, rule as string, farmId as string).catch((error: Error) => error);
        if (isAnError(result)) {
            next(result);
            return;
        }
        res.status(StatusCodes.OK).json(result);
    }
      

}

export default AnswerAutodiagRouter;