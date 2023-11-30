import { DataSource, Repository } from 'typeorm';

import { CountriesListRepository } from '../../repositories/country/countriesList.repository';
import { CountriesList } from '../../models/country/countriesList';
import { CountriesListEntity } from '../../entities/country/countriesList.entity';

export class CountriesListDao implements CountriesListRepository {
  private repository: Repository<CountriesListEntity>;

    constructor(connection: DataSource) {
        this.repository = connection.getRepository('countries_list');
    }

    async findByCode(code: string): Promise<CountriesList | undefined> {
        throw new Error('Method not implemented.');
    }

    async getAll(): Promise<CountriesList[]> {
        try{

            const result = await this.repository.find()
    
            return result as CountriesList[];
        }
        catch(e){
            console.log(e);
            return e.message;
        }
    }

}
