import * as dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import axios from 'axios';
import { CountriesList } from '../models/country/countriesList';
import { YvYError } from '../utils/error';
import { DataSource } from 'typeorm';
import { getConnection } from '../config/getConnection';
import PostgresDataSource from '../config/data-source';

dotenv.config();

async function resetUserDatabase() {

    const connection = await getConnection(PostgresDataSource);

  try {

   await connection.query('DELETE FROM countries_list')

    
    const countriesListEn  = await axios.get(`${process.env.COUNTRIES_API}/en/codes.json`).then(r => r.data);
    const countriesListEs  = await axios.get(`${process.env.COUNTRIES_API}/es/codes.json`).then(r => r.data);;
    
    const countriesList: CountriesList[] = [];

    for(const i in countriesListEn){
        if(!countriesList.find(c => c.code === i))
            countriesList.push({code: i, englishName: countriesListEn[i], name: countriesListEs[i] })
    }

    console.log(countriesList);

    for (const country of countriesList) {
      await connection.query('INSERT INTO countries_list (code, name, english_name) '+
      'VALUES ($1, $2, $3)', 
        [
            country.code, country.name, country.englishName
        ]
      ).catch(error => {throw new YvYError("Conflicto de carga en DB", StatusCodes.CONTINUE, error.message)});
    }

 
  } catch (error) {
    console.error('Error al reiniciar la base de datos de usuarios:', error);
    
  } finally {
    await connection.destroy()
    process.exit();
  }
}

resetUserDatabase();
