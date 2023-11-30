import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Country } from '../../models/country/country';

@Entity({ name: 'country' })
export class CountryEntity implements Country {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name',type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ name: 'english_name', type: 'varchar', length: 100, nullable: false })
  englishName: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  code: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'now()',
  })
  createdAt: Date;


}
