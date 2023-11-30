import * as utils from '../../utils/calculoHuellaHidrica';

const axios = require('axios');

export class WaterFootprintService {
  constructor() { }


  async calculateFootPrint(params: any): Promise<any> {
    try{
      const { tons, hectares } = params;
      const prop = parseFloat(tons) / parseFloat(hectares);
      const daily_etc_rr = await utils.etc(params);
      const out = utils.HH(daily_etc_rr, prop);
      const response = {
        hh_total:Math.round(out.etc),
        hh_green: 0,
        hh_blue: 0
      };
      if(out.etc>=out.ppet){
        response.hh_blue = Math.round(out.etc - out.ppet)
        response.hh_green = Math.round(out.ppet)
        }
      else{
        response.hh_blue = 0;
        response.hh_green = Math.round(out.etc);
      }
      return response
    } catch(e){
      console.log(e);
    }
  }

  
}
