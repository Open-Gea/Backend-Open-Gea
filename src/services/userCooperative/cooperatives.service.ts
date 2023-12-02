import { StatusCodes } from 'http-status-codes';
import { Cooperatives } from '../../models/userCooperative/cooperatives';
import { CooperativeRepository } from '../../repositories/userCooperative/cooperative.repository';
import { YvYError } from '../../utils/error';
import bcrypt from 'bcrypt';
import { CarbonFootPrint } from '../../models/carbonFootprint/carbonFootprint';
import { UserRepository } from '../../repositories/user/user.repository';
import { User, UserStatus } from '../../models/user/user';
import { FarmRepository } from '../../repositories/farm/farm.repository';
import { CarbonFootprintService } from '../carbonFootprint/carbonFootprint.service';
import { EvaluationSevice } from '../waterFootprint/evaluation.service';
import { Farm } from '../../models/farm/farm';
import { UserCooperativeRepository } from '../../repositories/userCooperative/userCooperative.repository';
import { UserCooperative } from '../../models/userCooperative/userCooperative';
import { AuthenticationService } from '../auth/authentication.service';
import { emailVerification } from '../../utils/email/emailVerification';

export class CooperativesService {
  constructor(
    private repository: CooperativeRepository,
    private usersRepository: UserRepository,
    private userCoopRepository: UserCooperativeRepository,
    private farmsRepository: FarmRepository,
    private carboonFootprintService: CarbonFootprintService,
    private waterFootprintService: EvaluationSevice,
    private authService: AuthenticationService
    ) { }

  async search(query?: string): Promise<Cooperatives[]> {
    return this.repository.search(query);
  }

  async create(item: Cooperatives, profilePictureFile: Express.Multer.File | undefined): Promise<Cooperatives | undefined> {
    if (await this.repository.findByEmail(item.email)) {
      throw new YvYError(
        'Email already in use',
        StatusCodes.BAD_REQUEST,
        'Email already in use'
      );
    }
    item.password = bcrypt.hashSync(item.password!, 10);
    item.email = item.email.toLowerCase();
    item.status = UserStatus.INACTIVE; // must verify email

    if (profilePictureFile) {
      
      item.profile_picture = profilePictureFile.buffer;

    }
    const result = await this.repository.create(item);
    
    if (result) {
      delete result.password;
      return await this.authService.sendVerificationEmail(result.email, result.id, true);
    }
    
    return result
  }

  async read(id: string): Promise<Cooperatives | undefined> {
    return this.repository.read(id);
  }
  
  async update(id: string, item: Cooperatives): Promise<boolean> {
    if (await this.repository.findById(id)) {
      return this.repository.update(id, item);
    }
    throw new YvYError('Cooperative not found', 404,'Cooperative not found');
  }

  async updateWithProfilePicture(id: string, item: Cooperatives, profilePictureFile: Express.Multer.File | undefined): Promise<boolean> {
    if (await this.repository.findById(id)) {
      
      if (profilePictureFile) {
        
        item.profile_picture = profilePictureFile.buffer;
      }
      return this.repository.update(id, item);
    }
    throw new YvYError('Cooperative not found', 404,'Cooperative not found');
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async getUsers(id: string): Promise<UserCooperative[] | undefined> {
    return await this.userCoopRepository.findUsersByCoop(id);
  } 

  async getCooperativesByUser(id: string): Promise<UserCooperative[] | undefined> {
    return await this.userCoopRepository.findCooperativesByUser(id);
  } 

  async getAllFarms(id:string): Promise<Farm[]| undefined>{
    
     const users_coop = await this.getUsers(id);
     console.log(users_coop);
     let results: any = [];
     if (users_coop) {
       for (const user_coop of users_coop) {
         delete user_coop.user.profile_picture;
         
         const farms = await this.farmsRepository.getAllByUserId(user_coop.user.id);
         if (farms) {
          const farmObj: any = {
            user: user_coop.user,
            farms: [],
          };
          for (const farm of farms) {
            farmObj.farms.push(farm);
          }
          results.push(farmObj);
         }
        }
      }
    return results;    
  }

  async getCarboonFootprint(id: string): Promise<any> {
    const users_coop = await this.getUsers(id);
  
    let resultsCarbon: any = [];
    if (users_coop) {
      for (const user_coop of users_coop) {
        delete user_coop.user.profile_picture;
        const farms = await this.farmsRepository.getAllByUserId(user_coop.user.id);
        if (farms) {
          const userObj: any = {
            user: user_coop.user,
            farms: [],
          };
  
          for (const farm of farms) {
            const resultsForFarm = await this.carboonFootprintService.readByFarmId(farm.id);
            const carbonFootprintObj = {
              farm,
              results: resultsForFarm,
            };
            userObj.farms.push(carbonFootprintObj);
          }
          resultsCarbon.push(userObj);
        }
      }
    }
  
    return resultsCarbon;
  } 


  async getWaterFootprint(id: string): Promise<any> {
    const users_coop = await this.getUsers(id);  
    let resultsWater: any = [];
    if (users_coop) {
      for (const user_coop of users_coop) {
        delete user_coop.user.profile_picture;
        const farms = await this.farmsRepository.getAllByUserId(user_coop.user.id);
        if (farms) {
          const userObj: any = {
            user: user_coop.user,
            farms: [],
          };
  
          for (const farm of farms) {
            const resultsForFarm = await this.waterFootprintService.findByUserAndFarm(user_coop.user.id,farm.id);
            const carbonFootprintObj = {
              farm,
              results: resultsForFarm,
            };
            userObj.farms.push(carbonFootprintObj);
          }
          resultsWater.push(userObj);
        }
      }
    }
  
    return resultsWater;
  } 

  // Search cooperative by ID
  async findById(id: string): Promise<Cooperatives | undefined> {
    return this.repository.findById(id);
  }

  async addUser(id: string, userId: string): Promise<UserCooperative | undefined> {
    const cooperative = await this.findById(id);
    if (!cooperative) {
      throw new YvYError('Cooperative not found', 404,'Cooperative not found' );
    }
  
    const user = await this.usersRepository.read(userId);
    if (!user) {
      throw new YvYError('User not found', 404,'User not found');
    }

    return await this.userCoopRepository.create({ user: user.id, cooperative: id } as unknown as UserCooperative);
  }

  async removeUser(id:string): Promise<boolean | undefined>{
    
    const userCoop = await this.userCoopRepository.read(id);
    if (!userCoop) {
      throw new YvYError('The id provided does not belong to any organization', 404,'The id provided does not belong to any organization');
    }

    return await this.userCoopRepository.delete(id);

  }

  // Accept Terms and Conditions
  async acceptTermsConditionsCooperative(id: string): Promise<boolean> {
    const foundCooperative = await this.findById(id);
    if (!foundCooperative) {
      throw new YvYError('Cooperative not found', 404,'Cooperative not found');
    }
    const updatedCooperative = { ...foundCooperative, acceptedTermsConditions: true };

    return this.repository.update(id, updatedCooperative);
  }

  async findByEmail(email: string): Promise<Cooperatives | undefined> {
    return this.repository.findByEmail(email);
  }

}
