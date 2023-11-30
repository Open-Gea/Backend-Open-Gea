type Factor = {
  consumption: number;
  category: string;
  emission_factor:number;
  optionalData: {
    wet_rate?: number; 
    nitrogen_rate?: number; 
    porcentaje: number; // en el sintetico es obligatorio y en el otro no. Como default dejar 0,9 en organico
    aplication_rate: number;
  }
  unit?:string;
};

type Data = {
  result: number;
};

function fossilFuel(consumption: number, gwp: number, emission_factor: number): number {
  const fossil_fuel_emission: number = consumption * emission_factor * gwp;
  return fossil_fuel_emission;
}

function electricityConsumption(consumption: number, gwp: number, emission_factor: number): number {
  const electricity_emission: number = consumption * emission_factor * gwp;
  return electricity_emission;
}

function biomassConsumption(consumption: number, gwp: number, emission_factor: number): number {
  const biomass_emission = consumption * emission_factor * (1/0.98201 * 0.139) * (1/1000000) * gwp;
  return biomass_emission;
}

function caseEmisison(consumption: number, gwp: number): number {
  return consumption * gwp;
}

function solidWaste(consumption: number, nitrogen_rate: number, wet_rate: number, gwp: number, emission_factor: number): number {
  const total_nitrogen = consumption * ((100 - wet_rate) / 100) * (nitrogen_rate / 100);
  return total_nitrogen * emission_factor * gwp * (44 / 28);
}

function sewageWaters(workers: number, gwp: number, emission_factor: number): number {
  return workers * emission_factor * (8 / 24) * (315 / 365) * gwp;
}

function defaultEmisison(consumption: number, gwp: number, emission_factor: number): number {
  return consumption * emission_factor * gwp;
}

function fertilizerSintetic(consumption:number,  application_rate:any, percentage: any, gwp: number, emission_factor: number): number {
  let total_nitrogen: number = 0;

  const total_consumption: number = parseFloat(application_rate) * consumption;
  const nitrogen_percentage: number = parseFloat(percentage);
  total_nitrogen = (total_consumption * (nitrogen_percentage / 100));

  const fertilizer_emission: number = total_nitrogen * emission_factor * gwp * (44 / 28);
  return fertilizer_emission;
}

function fertilizerOrganic(consumption:number,  application_rate:any, percentage: any, gwp: number, emission_factor: number): number {

  let total_nitrogen: number = 0;

  const total_consumption: number = application_rate * consumption;
 
  let nitrogen_percentage: number = 0.9;

  if(percentage){
    nitrogen_percentage = percentage;
  }
  
  let nitrogen_aux: number = (total_consumption * (nitrogen_percentage / 100));

  total_nitrogen = nitrogen_aux;

  const fertilizer_emission: number = total_nitrogen * emission_factor * gwp * (44 / 28);
  return fertilizer_emission;
}


export function calculoHuellaDeCarbono( consumo:number, factor: Factor, gwp:number,emission_factor: string): Data {

  let emission: number = 0;
  const category = factor.category;
  const consumption = consumo;
  const emission_factor_number = parseFloat(emission_factor);
  
  switch (category) {
    case 'Fossil Fuel Consumption':
      emission = fossilFuel(consumption, gwp, emission_factor_number);
      break;
    case 'Consumo Electricidad':
      emission = electricityConsumption(consumption, gwp, emission_factor_number);
      break;
    case 'Fertilizante Sintetico':
        if (factor.optionalData.aplication_rate && factor.optionalData.porcentaje) {

          emission = fertilizerSintetic(consumption, factor.optionalData.aplication_rate,factor.optionalData.porcentaje, gwp, emission_factor_number);
        } else {
            throw new Error('Missing fertilizers');
        }
        break;
    case 'Fertilizante Organico':
      if (factor.optionalData.aplication_rate) {
          emission = fertilizerOrganic(consumption,factor.optionalData.aplication_rate,factor.optionalData.porcentaje, gwp, emission_factor_number);
      } else {
          throw new Error('Missing fertilizers');
      }
      break;
    case 'Biomass consumption':
      
      emission = biomassConsumption(consumption, gwp, emission_factor_number);

      break;
    case 'Fugas de refrigerante':
      emission = caseEmisison(consumption, gwp);
      break;

    case 'Extintores':
      emission = caseEmisison(consumption, gwp);
      break;

    case 'Residuo sólido':
      let wet_rate = factor.optionalData.wet_rate ? factor.optionalData.wet_rate : 94.6;
      let nitrogen_rate = factor.optionalData.nitrogen_rate ? factor.optionalData.nitrogen_rate: 1.34;

      emission = solidWaste(consumption, nitrogen_rate, wet_rate, gwp, emission_factor_number);
      break;

    case 'Aguas Residuales':
      emission = sewageWaters(consumption, gwp, emission_factor_number);
      break;

    default:
      emission = defaultEmisison(consumption, gwp, emission_factor_number);
      break;
    }


  const data = {
    'result': emission
  };
    
  
  return data;
  }
