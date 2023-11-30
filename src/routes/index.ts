import { Router } from "express";
import usersRouter from "./user/user.routes";
import farmRouter from "./farm/farm.routes";
import { YvYService } from "../services";
import authenticationRouter from "./auth/authentication.routes";
import apiWeatherRouter from "./apiWeather/apiWeather.routes";
import seasonalForecastRouter from "./apiWeather/seasonalForecast.routes";
import waterFootprintRouter from "./waterFootprint/waterFootprint.routes";
import carbonFootprintRouter from "./carbonFootprint/carbonFootprin.routes";
import emissionFactorRouter from "./carbonFootprint/emissionFactor.routes";
import reportRouter from "./utils/report.routes";
import PruningManagementRouter from "./soilReg/pruningManagement.routes";
import IrrigationSystemsRouter from "./soilReg/irrigationSystems.routes";
import GWPRouter from "./utils/gwp.routes";
import cropCoefficientRouter from "./waterFootprint/cropCoefficient.routes";
import productsRouter from "./product/product.routes";
import evaluationRouter from "./waterFootprint/evaluation.routes";
import recordsRouter from "./record/records.routes";
import questionAutodiagRouter from "./autodiag/questionAutodiag.routes";
import answerAutodiagRouter from "./autodiag/answerAutodiag.routes";
import cooperativesRouter from "./userCooperative/cooperative.routes";
import UserCooperativeRequestsRouter from "./userCooperative/userCooperativeRequests.routes";
import adminRouter from "./admin/admin.routes";
import settingQrRouter from "./qr/settingQr.routes";
import scanFileRouter from "./utils/scanFile.routes";
import { CategoryAutodiagEntity } from "../entities/autodiagV2/category.entity";
import GenericRouter from "./utils/generic.routes";
import { QuestionAutodiagEntityV2 } from "../entities/autodiagV2/question.entity";
import AnswerAutodiagRouter from "./autodiagV2/answer.routes";
import weatherForecastRouter from "./apiWeather/weatherForecast.routes";
import coverManagementRouter from "./soilReg/coverManagement.routes";
import tillageRouter from "./soilReg/tillage.routes";
import fertilizationRouter from "./soilReg/fertilization.routes";
import irrigationSystemsRouter from "./soilReg/irrigationSystems.routes";
import CropManagementRouter from "./soilReg/cropManagement.routes";

export class YvYRouter{
    private router: Router;

    constructor() {
        this.initialize()
    }

    private async initialize(){
        this.router = Router();
        const s = new YvYService();
        await s.initialize();
        this.setupRoutes(s);
    }

    private setupRoutes(s: YvYService) {
        if (s) {
            this.router.use('/users', usersRouter(s.userService, s.mediaService));
            this.router.use("/farms", farmRouter(s.farmService, s.evaluationService, s.carbonFootPrintService));
            this.router.use("/auth", authenticationRouter(s.authenticationService))
            this.router.use('/apiWeather', apiWeatherRouter(s.apiWeatherService))
            this.router.use('/seasonalForecast', seasonalForecastRouter(s.seasonalForecastService))
            this.router.use('/waterFootPrint', waterFootprintRouter(s.waterFootPrintService))
            this.router.use('/carbonFootPrint', carbonFootprintRouter(s.carbonFootPrintService))
            this.router.use('/emissionFactor', emissionFactorRouter(s.emissionFactorService))
            this.router.use('/reports', reportRouter(s.reportService))

            this.router.use('/soil-regeneration/cover', coverManagementRouter(s.coverManagementService))
            this.router.use('/soil-regeneration/tillage', tillageRouter(s.tillageService))
            this.router.use('/soil-regeneration/fertilization', fertilizationRouter(s.fertilizationService))
            this.router.use('/soil-regeneration/pruningManagement', PruningManagementRouter(s.pruningManagementService))
            this.router.use('/soil-regeneration/croprotation', CropManagementRouter(s.cropManagementService))
            this.router.use('/soil-regeneration/irrigation', IrrigationSystemsRouter(s.cropRotationService))

            this.router.use('/auth', authenticationRouter(s.authenticationService))
            this.router.use('/gwps', GWPRouter(s.gwpService))
            this.router.use("/weatherForecast", weatherForecastRouter(s.weatherForecastService, s.farmService))
            this.router.use('/cropCoefficient', cropCoefficientRouter(s.cropCoefficientService))
            this.router.use('/products', productsRouter(s.productService))
            this.router.use('/evaluation', evaluationRouter(s.evaluationService))

            this.router.use('/records/lots',recordsRouter(s.lotService))
            this.router.use('/records/performance', recordsRouter(s.performancesService))
            this.router.use('/records/sowing', recordsRouter(s.sowingService))
            this.router.use('/records/fertilizations', recordsRouter(s.fertilizerService))
            this.router.use('/records/bioInputs', recordsRouter(s.bioinputsService))
            this.router.use('/records/labors', recordsRouter(s.laborsService))
            this.router.use('/records/soils', recordsRouter(s.soilService))
            this.router.use('/records/staff',  recordsRouter(s.staffService))
            this.router.use('/records/sales', recordsRouter(s.saleService))
            this.router.use('/records/suppliers', recordsRouter(s.supplierService))
            this.router.use('/records/agrochemicals', recordsRouter(s.agrochemicalService))
            this.router.use('/records/prodInfo', recordsRouter(s.prodInfoService))
            this.router.use('/records/revenuesExpenses', recordsRouter(s.revenuesExpensesService))
            this.router.use('/records/phyto', recordsRouter(s.phytoService))
            this.router.use('/questions', questionAutodiagRouter(s.questionService))
            this.router.use('/answer', answerAutodiagRouter(s.answerService))

            this.router.use('/cooperatives', cooperativesRouter(s.cooperativeService))

            this.router.use('/userCooperatives', UserCooperativeRequestsRouter(s.userCooperativeRequestsService))

            this.router.use('/admin', adminRouter(s.adminService))
   
            this.router.use('/autodiag/category',new GenericRouter<CategoryAutodiagEntity>(s.categoryAutodiagService).router)
            this.router.use('/autodiag/question', new GenericRouter<QuestionAutodiagEntityV2>(s.questionAutodiagServiceV2).router)
            this.router.use('/autodiag/answer', new AnswerAutodiagRouter(s.answerAutodiagServiceV2).router)

            this.router.use('/setting/qr', settingQrRouter(s.settingQrService))

            this.router.use('/scan-file', scanFileRouter())
            
        } else {
            console.warn('Las rutas no se han configurado porque los servicios no se han inicializado.');
        }
    }

    getRouter(): Router {
        return this.router;
    }
}

const yvyRouter = new YvYRouter();
const mainRouter = yvyRouter.getRouter();

export default mainRouter;



