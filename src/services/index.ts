import { CategoryAutodiagEntity } from "../entities/autodiagV2/category.entity";
import { QuestionAutodiagEntityV2 } from "../entities/autodiagV2/question.entity";
import { AgrochemicalEntity } from "../entities/records/agrochemical.entity";
import { BioinputsEntity } from "../entities/records/bioinputs.entity";
import { FertilizerEntity } from "../entities/records/fertilizations.entity";
import { LaborEntity } from "../entities/records/labors.entity";
import { LotEntity } from "../entities/records/lots.entity";
import { PerformanceEntity } from "../entities/records/performance.entity";
import { PhytoEntity } from "../entities/records/phyto.entity";
import { ProdInfoEntity } from "../entities/records/prodInfo.entity";
import { RevenuesExpensesEntity } from "../entities/records/revenueExpenses.entity";
import { SaleEntity } from "../entities/records/sales.entity";
import { SoilEntity } from "../entities/records/soil.entity";
import { SowingEntity } from "../entities/records/sowing.entity";
import { StaffEntity } from "../entities/records/staff.entity";
import { SupplierEntity } from "../entities/records/suppliers.entity";
import { AdminService } from "./admin/admin.service";
import { AnswersAutodiagService } from "./autodiag/answerAutodiag.service";
import { ApiWeatherService } from "./apiWeather/apiWeather.service";
import { AuthenticationService } from "./auth/authentication.service";
import AnswerAutodiagServiceV2 from "./autodiagV2/answer.service";
import { CarbonFootprintService } from "./carbonFootprint/carbonFootprint.service";
import { CooperativesService } from "./userCooperative/cooperatives.service";
import { CoverManagementService } from "./soilReg/coverManagement.service";
import { CropCoefficientService } from "./waterFootprint/cropCoefficient.service";
import { CropManagementService } from "./soilReg/cropManagement.service";
import { EmissionFactorService } from "./carbonFootprint/emissionFactor.service";
import { EvaluationSevice } from "./waterFootprint/evaluation.service";
import { FarmService } from "./farm/farm.service";
import { FertilizationService } from "./soilReg/fertilization.service";
import { GenericService } from "./utils/generic.service";
import { GWPService } from "./utils/gwp.service";
import { IrrigationSystemsService } from "./soilReg/irrigationSystems.service";
import { MediaService } from "./utils/media.service";
import { ProductService } from "./product/product.service";
import { PruningManagementService } from "./soilReg/pruningManagement.service";
import { QuestionsAutodiagService } from "./autodiag/questionAutodiag.service";
import { RecordService } from "./record/record.service";
import { ReportService } from "./utils/report.service";
import { SeasonalForecastService } from "./apiWeather/seasonalForecast.service";
import { SettingQrService } from "./qr/settingQr.service";
import { TillageService } from "./soilReg/tillage.service";
import { UserService } from "./user/user.service";
import { UserCooperativeRequestsService } from "./userCooperative/userCooperativeRequests.service";
import { WaterFootprintService } from "./waterFootprint/waterFootprint.service";
import { WeatherForecastService } from "./apiWeather/weatherForecast.service";
import { YvYRepository } from "../data-access";


export class YvYService{
    public userService: UserService;
    public farmService: FarmService;
    public carbonFootPrintService: CarbonFootprintService;
    public evaluationService: EvaluationSevice;
    public gwpService: GWPService;
    public mediaService: MediaService;
    
    public authenticationService: AuthenticationService
    public cropCoefficientService: CropCoefficientService
    public emissionFactorService: EmissionFactorService
    public productService: ProductService 
    public reportService: ReportService
    public adminService: AdminService
    public weatherForecastService: WeatherForecastService
    public apiWeatherService: ApiWeatherService
    public seasonalForecastService: SeasonalForecastService
    public waterFootPrintService: WaterFootprintService

    public lotService: RecordService<LotEntity>
    public performancesService: RecordService<PerformanceEntity>
    public sowingService: RecordService<SowingEntity>
    public fertilizerService: RecordService<FertilizerEntity>
    public bioinputsService : RecordService<BioinputsEntity>
    public laborsService: RecordService<LaborEntity>
    public soilService: RecordService<SoilEntity>
    public staffService: RecordService<StaffEntity>
    public saleService: RecordService<SaleEntity>
    public supplierService: RecordService<SupplierEntity>
    public agrochemicalService: RecordService<AgrochemicalEntity>
    public prodInfoService: RecordService<ProdInfoEntity>
    public revenuesExpensesService: RecordService<RevenuesExpensesEntity>
    public phytoService: RecordService<PhytoEntity> 

    public questionService: QuestionsAutodiagService 
    public answerService: AnswersAutodiagService
    public settingQrService: SettingQrService
    public cooperativeService: CooperativesService
    public coverManagementService: CoverManagementService
    public tillageService: TillageService
    public fertilizationService: FertilizationService 
    public pruningManagementService: PruningManagementService 
    public cropManagementService: CropManagementService 
    public cropRotationService: IrrigationSystemsService
    public userCooperativeRequestsService: UserCooperativeRequestsService
     
    public categoryAutodiagService: GenericService<CategoryAutodiagEntity>
    public questionAutodiagServiceV2: GenericService<QuestionAutodiagEntityV2>
    public answerAutodiagServiceV2: AnswerAutodiagServiceV2

    constructor(r: YvYRepository) {
        this.initialize(r)
    };

    private async initialize(r: YvYRepository){

        this.userService = new UserService(r.userRepo);
        this.farmService = new FarmService(r.farmRepo);
        this.carbonFootPrintService = new CarbonFootprintService(r.carbonFootprintRepo, r.gwpRepo,r.farmRepo,r.emissionFactorRepo);
        this.evaluationService = new EvaluationSevice(r.evaluationRepo,r.userRepo,r.farmRepo,r.productRepo);
        this.gwpService = new GWPService(r.gwpRepo);
        this.mediaService = new MediaService(r.mediaRepo);

        this.authenticationService = new AuthenticationService(r.userRepo,r.cooperativeRepo);
        this.cropCoefficientService = new CropCoefficientService(r.cropCoefficientRepo);
        this.emissionFactorService = new EmissionFactorService(r.emissionFactorRepo);

        this.productService = new ProductService(r.productRepo);
        this.reportService = new ReportService(r.reportRepo);
        this.adminService = new AdminService(r.userRepo ,r.cooperativeRepo, r.countryRepo, r.countriesListRepo);
        this.weatherForecastService = new WeatherForecastService();
        this.apiWeatherService = new ApiWeatherService();
        this.seasonalForecastService = new SeasonalForecastService();
        this.waterFootPrintService = new WaterFootprintService();

        this.lotService = new RecordService(r.lotRepo);
        this.performancesService = new RecordService(r.performancesRepo);
        this.sowingService = new RecordService(r.sowingRepo);
        this.fertilizerService = new RecordService(r.fertilizerRepo);
        this.bioinputsService = new RecordService(r.bioinputsRepo);
        this.laborsService = new RecordService(r.laborsRepo);
        this.soilService = new RecordService(r.soilsRepo);
        this.staffService = new RecordService(r.staffRepo);        
        this.saleService = new RecordService(r.salesRepo);        
        this.supplierService = new RecordService(r.supplierRepo);        
        this.agrochemicalService = new RecordService(r.agrochemicalRepo);        
        this.prodInfoService = new RecordService(r.prodInfoRepo);        
        this.revenuesExpensesService = new RecordService(r.revenuesExpensesRepo);        
        this.phytoService = new RecordService(r.phytoRepo);        
        this.questionService = new QuestionsAutodiagService(r.questionAutodiagRepo)
        this.answerService = new AnswersAutodiagService(r.answerAutodiagRepo,r.userRepo,r.questionAutodiagRepo,r.farmRepo);
        this.settingQrService = new SettingQrService(r.settingQrRepo);
        this.cooperativeService = new CooperativesService(r.cooperativeRepo,r.userRepo,r.userCoopRepository,r.farmRepo,this.carbonFootPrintService,this.evaluationService, this.authenticationService);
        this.coverManagementService = new CoverManagementService(r.coverManagementRepository)
        this.tillageService = new TillageService(r.tillageRepository)
        this.fertilizationService = new FertilizationService(r.fertilizationRepository)
        this.pruningManagementService = new PruningManagementService(r.pruningManagementRepository)
        this.cropManagementService = new CropManagementService(r.cropManagementRepository)
        this.cropRotationService  = new IrrigationSystemsService(r.cropRotationRepository)
        this.userCooperativeRequestsService= new UserCooperativeRequestsService(r.userCooperativeRequestsRepo)
        this.categoryAutodiagService = new GenericService(r.categoryAutodiagRepo);
        this.questionAutodiagServiceV2 = new GenericService(r.questionAutodiagRepoV2);
        this.answerAutodiagServiceV2 = new AnswerAutodiagServiceV2(r.answerAutodiagRepoV2, r.questionAutodiagRepoV2, r.categoryAutodiagRepo);

    }

}




  
