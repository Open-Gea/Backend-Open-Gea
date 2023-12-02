import { User, UserStatus } from '../../models/user/user';
import {  Country } from '../../models/country/country';
import { CountryRepository } from '../../repositories/country/country.repository';

import { Cooperatives } from '../../models/userCooperative/cooperatives';
import { UserRepository } from '../../repositories/user/user.repository';
import { CooperativeRepository } from '../../repositories/userCooperative/cooperative.repository';

import { YvYError } from '../../utils/error';
import { StatusCodes } from 'http-status-codes';
import { CountriesListRepository } from '../../repositories/country/countriesList.repository';
import { CountriesList } from '../../models/country/countriesList';

export class AdminService {
  constructor(
    private repository: UserRepository,
    private coopRepository: CooperativeRepository,
    private countryRepository: CountryRepository,
    private countriesListRepo: CountriesListRepository
  ) { }

  async search(query?: string): Promise<User[]> {
    return (await this.repository.search(query)).map((user) => {
      delete user.password;
      return user;
    });
  }

  async findByCountry(country: string): Promise<User[]> {
    //return this.repository.findByCountry(country);
    return (await this.repository.findByCountry(country)).map((user) => {
      delete user.password;
      return user;
    });
  }

  async disable(id: string, isAdmin: boolean): Promise<boolean> {

    if (isAdmin) {
      const cooperative = await this.coopRepository.findById(id);
      if (!cooperative) {
        throw new YvYError('Cooperative not found', StatusCodes.NOT_FOUND, 'Cooperative not found');
      }
      return this.coopRepository.disable(id);
    } else {
      const user = await this.repository.read(id);
      if (!user) {
        throw new YvYError('User not found', StatusCodes.NOT_FOUND, 'User not found');
      }
      return this.repository.disable(id);
    }

  }

  async enable(id: string, isAdmin: boolean): Promise<boolean> {

    if (isAdmin) {
      const cooperative = await this.coopRepository.findById(id);
      if (!cooperative) {
        throw new YvYError('Cooperative not found', StatusCodes.NOT_FOUND, 'Cooperative not found');;
      }
      return this.coopRepository.enable(id);
    } else {
      const user = await this.repository.read(id);
      if (!user) {
        throw new YvYError('User not found', StatusCodes.NOT_FOUND, 'User not found');
      }
      return this.repository.enable(id);
    }

  }

  async isUserActive(id: string): Promise<boolean> {
    const user = await this.repository.read(id);
    if (!user) {
      throw new YvYError('User not found', StatusCodes.NOT_FOUND, 'User not found');
    }

    return user.status === UserStatus.ACTIVE;
  }

  async getCooperatives(query?: string): Promise<Cooperatives[]> {

    return (await this.coopRepository.search(query)).map((cooperative) => {
      delete cooperative.password;
      return cooperative;
    });
  }

  async getCooperativesByCountry(country: string): Promise<Cooperatives[]> {
    return this.coopRepository.findByCountry(country);
  }

  async getAllCountries(): Promise<Country[]> {
    return this.countryRepository.getAll();
  }

  async getAllCountriesList(): Promise<CountriesList[]> {
    return this.countriesListRepo.getAll();
  }

  async getCountry(id: string): Promise<Country | undefined> {
    return this.countryRepository.read(id);
  }

  async createCountry(item: Country): Promise<Country | undefined> {
    
   try {
    
    return this.countryRepository.create(item);

   } catch (error) {
    
    throw new YvYError("error", 500,error);

   }
  }
  async deleteCountry(id: string): Promise<boolean> {
    return this.countryRepository.delete(id);
  }

  async updateCountry(id: string, item: Country): Promise<boolean> {

    if (await this.countryRepository.read(id)) {
      return this.countryRepository.update(id, item);
    }
    throw new YvYError("Country not found", 404,"Country not found");
  }

}
