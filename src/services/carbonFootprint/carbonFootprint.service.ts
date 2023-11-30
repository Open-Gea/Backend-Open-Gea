import { CarbonFootPrint } from '../../models/carbonFootprint/carbonFootprint';
import { CarbonFootprintRepository } from '../../repositories/carbonFootprint/carbonFootprint.repository';
import { EmissionFactorRepository } from '../../repositories/carbonFootprint/emissionFactor.repository';
import { FarmRepository } from '../../repositories/farm/farm.repository';
import { GWPRepository } from '../../repositories/utils/gwp.repository';
import { calculoHuellaDeCarbono } from '../../utils/calculoHuellaDeCarbono';
import { YvYError } from '../../utils/error';

export class CarbonFootprintService {
  constructor(
    private carbonFootprintRepository: CarbonFootprintRepository,
    private gwpRepository: GWPRepository,
    private farmRepository: FarmRepository,
    private emissionFactorRepository: EmissionFactorRepository
    ) { }


  async create(item: CarbonFootPrint): Promise<CarbonFootPrint | undefined> {
    return this.carbonFootprintRepository.create(item);
  }
  
  async calculateCarbon(params: any): Promise<any> {
    try{
     
      const { farmId, año,factor,consumo } = params;

      const farm = await this.farmRepository.read(farmId);
      if (!farm) {
        throw new YvYError('Farm not found', 404,'Farm not found');
      }
      
      const emission_factor = await this.emissionFactorRepository.findById(factor.id)
      if (!emission_factor) {
        throw new YvYError('Emission Factor not found', 404, 'Emission Factor not found');
      }
      const gwp =await this.gwpRepository.findById(factor.formula);
      if (!gwp) {
        throw new YvYError('Gwp not found', 404, 'Gwp not found');
      }

      const response = calculoHuellaDeCarbono(consumo,factor, gwp.value,emission_factor.emission_factor);
      const carbonFootprint: any = {
        result : response.result,
        year: año,
        consumption: consumo,
        farm: farm,
        emissionFactor: emission_factor
      }
            
      return await this.create(carbonFootprint)
    } catch(e){
      console.log(e);
    }
  }

  async findAll(): Promise <CarbonFootPrint | undefined> {
    return this.carbonFootprintRepository.findAll();
  }

  async delete(id: string): Promise<boolean> {
    return this.carbonFootprintRepository.delete(id);
  }

  async deleteByFarm(farm: string): Promise<boolean> {
    
    return this.carbonFootprintRepository.deleteByFarm(farm);
  }

  async read(id: string): Promise<CarbonFootPrint | undefined> {
    return this.carbonFootprintRepository.read(id);
  }

  async readByFarmId(id: string): Promise<CarbonFootPrint[] | undefined> {
    return this.carbonFootprintRepository.findByFarmId(id);
  } 
  
}
