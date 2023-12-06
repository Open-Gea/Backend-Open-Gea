import { DataSource } from "typeorm";
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
import { AnswerAutodiagRepository } from "../repositories/autodiag/answerAutodiag.repository";
import { AnswerAutodiagRepositoryV2 } from "../repositories/autodiagV2/answer.repository";
import { CarbonFootprintRepository } from "../repositories/carbonFootprint/carbonFootprint.repository";
import { CooperativeRepository } from "../repositories/userCooperative/cooperative.repository";
import { CountriesListRepository } from "../repositories/country/countriesList.repository";
import { CountryRepository } from "../repositories/country/country.repository";
import { CoverManagementRepository } from "../repositories/soilReg/coverManagement.repository";
import { CropCoefficientRepository } from "../repositories/waterFootprint/cropCoefficient.repository";
import { CropManagementRepository } from "../repositories/soilReg/cropManagement.repository";
import { EmissionFactorRepository } from "../repositories/carbonFootprint/emissionFactor.repository";
import { EvaluationRepository } from "../repositories/waterFootprint/evaluation.repository";
import { FarmRepository } from "../repositories/farm/farm.repository";
import { FertilizationRepository } from "../repositories/soilReg/fertilization.repository";
import { GenericRepo } from "../repositories/utils/generic.repo";
import { GWPRepository } from "../repositories/utils/gwp.repository";
import { IrrigationSystemsRepository } from "../repositories/soilReg/irrigationSystems.repository";
import { MediaRepository } from "../repositories/utils/media.repository";
import { ProductRepository } from "../repositories/product/product.repository";
import { PruningManagementRepository } from "../repositories/soilReg/pruningManagement.repository";
import { QuestionAutodiagRepository } from "../repositories/autodiag/questionAutodiag.repository";
import { RecordRepository } from "../repositories/record/recordRepository";
import { ReportRepository } from "../repositories/utils/report.repository";
import { SettingQrRepository } from "../repositories/qr/settingQr.repository";
import { TillageRepository } from "../repositories/soilReg/tillage.repository";
import { UserRepository } from "../repositories/user/user.repository";
import { UserCooperativeRepository } from "../repositories/userCooperative/userCooperative.repository";
import { UserCooperativeRequestsRepository } from "../repositories/userCooperative/userCooperativeRequest.repository";
import { AnswerAutodiagDAO } from "./autodiag/answer-autodiag.dao";
import { AnswerAutoDiagDAOV2 } from "./autodiagV2/answer.dao";
import { CarbonFootPrintDAO } from "./carbonFootprint/carbonFootprint.dao";
import { CooperativeDAO } from "./userCooperative/cooperative.dao";
import { CountriesListDao } from "./country/countriesList.dao";
import { CountryDao } from "./country/country.dao";
import { CoverManagementDao } from "./soilReg/coverManagement.dao";
import { CropCoefficientDAO } from "./waterFootprint/cropCoefficient.dao";
import { CropManagementDao } from "./soilReg/cropManagement.dao";
import { EmissionFactorDAO } from "./carbonFootprint/emissionFactor.dao";
import { EvaluationDAO } from "./waterFootprint/evaluation.dao";
import { FarmDao } from "./farm/farm.dao";
import { FertilizationDao } from "./soilReg/fertilization.dao";
import { GenericDAOV2 } from "./utils/generic.dao";
import { GWPDAO } from "./utils/gwp.dao";
import { IrrigationSystemsDao } from "./soilReg/irrigationSystems.dao";
import { MediaDAO } from "./utils/media.dao";
import { ProductDAO } from "./product/product.dao";
import { PruningManagementDao } from "./soilReg/pruningManagement.dao";
import { QuestionAutodiagDAO } from "./autodiag/question-autodiag.dao";
import { GenericDAO } from "./record/records.dao";
import { ReportDAO } from "./utils/report.dao";
import { SettingQrDAO } from "./qr/settingQr.dao";
import { TillageDao } from "./soilReg/tillage.dao";
import { UserCooperativeRequestsDAO } from "./userCooperative/userCooperativeRequests.dao";
import { UserDAO } from "./user/user.dao";
import { UserCooperativeDAO } from "./userCooperative/userCooperative.dao";
import { getConnection } from "../config/getConnection";



export class YvYRepository {
    private connection: DataSource;
  
    public userRepo: UserRepository;
    public farmRepo: FarmRepository;
    public mediaRepo: MediaRepository;
    public carbonFootprintRepo: CarbonFootprintRepository;
    public gwpRepo: GWPRepository;
    public emissionFactorRepo: EmissionFactorRepository;
    public evaluationRepo: EvaluationRepository;
    public productRepo: ProductRepository;
    
    public cropCoefficientRepo: CropCoefficientRepository;
    public reportRepo: ReportRepository
    
    public lotRepo: RecordRepository<LotEntity>;
    public performancesRepo: RecordRepository<PerformanceEntity>
    public sowingRepo: RecordRepository<SowingEntity>
    public fertilizerRepo: RecordRepository<FertilizerEntity>
    public bioinputsRepo : RecordRepository<BioinputsEntity>
    public laborsRepo: RecordRepository<LaborEntity> 
    public soilsRepo: RecordRepository<SoilEntity>
    public staffRepo: RecordRepository<StaffEntity>
    public salesRepo: RecordRepository<SaleEntity>
    public supplierRepo: RecordRepository<SupplierEntity>
    public agrochemicalRepo: RecordRepository<AgrochemicalEntity>
    public prodInfoRepo: RecordRepository<ProdInfoEntity>
    public revenuesExpensesRepo: RecordRepository<RevenuesExpensesEntity>
    public phytoRepo: RecordRepository<PhytoEntity>

    public settingQrRepo: SettingQrRepository
    public questionAutodiagRepo: QuestionAutodiagRepository
    public answerAutodiagRepo: AnswerAutodiagRepository
    public categoryAutodiagRepo: GenericRepo<CategoryAutodiagEntity>
    public questionAutodiagRepoV2: GenericRepo<QuestionAutodiagEntityV2>
    public answerAutodiagRepoV2: AnswerAutodiagRepositoryV2
    public countryRepo: CountryRepository
    public countriesListRepo: CountriesListRepository
     
    public coverManagementRepository: CoverManagementRepository
    public tillageRepository: TillageRepository
    public fertilizationRepository: FertilizationRepository
    public pruningManagementRepository: PruningManagementRepository
    public cropManagementRepository: CropManagementRepository
    public cropRotationRepository: IrrigationSystemsRepository
 
    public cooperativeRepo: CooperativeRepository
    public userCoopRepository : UserCooperativeRepository
    public userCooperativeRequestsRepo: UserCooperativeRequestsRepository

    constructor () {}
  
    public async initialize(dataSource: DataSource) {
      this.connection = await getConnection(dataSource);
      this.userRepo = new UserDAO(this.connection);
      this.farmRepo = new FarmDao(this.connection);
      this.mediaRepo = new MediaDAO(this.connection);
      this.carbonFootprintRepo = new CarbonFootPrintDAO(this.connection);
      this.gwpRepo = new GWPDAO(this.connection);
      this.emissionFactorRepo = new EmissionFactorDAO(this.connection);
      this.evaluationRepo = new EvaluationDAO(this.connection);
      this.productRepo = new ProductDAO(this.connection);
      
      this.cropCoefficientRepo = new CropCoefficientDAO(this.connection);
      this.reportRepo = new ReportDAO(this.connection);

      this.lotRepo = new GenericDAO(this.connection,LotEntity);
      this.performancesRepo = new GenericDAO(this.connection,PerformanceEntity);
      this.sowingRepo = new GenericDAO(this.connection,SowingEntity);
      this.fertilizerRepo = new GenericDAO(this.connection,FertilizerEntity);
      this.bioinputsRepo = new GenericDAO(this.connection,BioinputsEntity);
      this.laborsRepo = new GenericDAO(this.connection,LaborEntity);
      this.soilsRepo = new GenericDAO(this.connection,SoilEntity);
      this.staffRepo = new GenericDAO(this.connection,StaffEntity);
      this.salesRepo = new GenericDAO(this.connection,SaleEntity);
      this.supplierRepo = new GenericDAO(this.connection,SupplierEntity);
      this.agrochemicalRepo = new GenericDAO(this.connection,AgrochemicalEntity);
      this.prodInfoRepo = new GenericDAO(this.connection,ProdInfoEntity);
      this.revenuesExpensesRepo = new GenericDAO(this.connection,RevenuesExpensesEntity);
      this.phytoRepo = new GenericDAO(this.connection,PhytoEntity);
      
      this.settingQrRepo = new SettingQrDAO(this.connection);
      this.questionAutodiagRepo = new QuestionAutodiagDAO(this.connection);
      this.answerAutodiagRepo = new AnswerAutodiagDAO(this.connection);
      this.categoryAutodiagRepo = new GenericDAOV2(this.connection,CategoryAutodiagEntity);
      this.questionAutodiagRepoV2 = new GenericDAOV2(this.connection,QuestionAutodiagEntityV2);
      this.answerAutodiagRepoV2 = new AnswerAutoDiagDAOV2(this.connection);
      this.countryRepo = new CountryDao(this.connection);
      this.countriesListRepo = new CountriesListDao(this.connection);

      this.coverManagementRepository = new CoverManagementDao(this.connection);
      this.tillageRepository = new TillageDao(this.connection);
      this.fertilizationRepository = new FertilizationDao(this.connection);
      this.pruningManagementRepository = new PruningManagementDao(this.connection);
      this.cropManagementRepository = new CropManagementDao(this.connection);
      this.cropRotationRepository = new IrrigationSystemsDao(this.connection);
      
      this.cooperativeRepo = new CooperativeDAO(this.connection);
      this.userCoopRepository = new UserCooperativeDAO(this.connection);
      this.userCooperativeRequestsRepo = new UserCooperativeRequestsDAO(this.connection);
    }
    
    
   }




