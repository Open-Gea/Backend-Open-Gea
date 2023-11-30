import { Column, Entity, PrimaryColumn } from "typeorm";
import { CountriesList } from "../../models/country/countriesList";

@Entity('countries_list')
export class CountriesListEntity implements CountriesList{
    @PrimaryColumn({type: 'varchar', name:'code'})
    code: string;

    @Column({type: 'varchar', name: 'name'})
    name: string;

    @Column({name:'english_name', type:'varchar'})
    englishName: string;

}