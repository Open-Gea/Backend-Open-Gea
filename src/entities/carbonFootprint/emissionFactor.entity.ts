import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

import { EmissionFactor } from '../../models/carbonFootprint/emissionFactor';

@Entity({ name: 'emission_factors' })
export class EmissionFactorEntity implements EmissionFactor {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ name: 'name', type: 'varchar', length: 128, nullable: false })
    name: string;

  @Column({ name: 'category', type: 'varchar', length: 64, nullable: false })
    category: string;

  @Column({
    name: 'emission_factor',
    type: 'varchar',
    length: 64,
    nullable: false,
  })
    emission_factor: string;

  @Column({ name: 'formula', type: 'varchar', length: 64, nullable: false })
    formula: string;

  @Column({
    name: 'unit',
    type: 'varchar',
    length: 64,
    nullable: false,
  })
    unit: string;

  @Column({ name: 'countries', type: 'varchar', array: true })
    countries: Array<string>;

  @Column({ name: 'years', type: 'int', nullable: false, array: true })
    years: Array<number>;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'now()',
  })
    createdAt: Date;

}
