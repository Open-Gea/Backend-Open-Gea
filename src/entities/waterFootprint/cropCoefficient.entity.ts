import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

import { CropCoefficient } from '../../models/waterFootprint/cropCoefficient';

@Entity({ name: 'crop_coefficient' })
export class CropCoefficientEntity implements CropCoefficient {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ name: 'name', type: 'varchar', length: 64, nullable: false })
    name: string;

  @Column({ name: 'category', type: 'varchar', length: 64, nullable: false })
    category: string;

  @Column({
    name: 'init',
    type: 'varchar',
    length: 64,
    nullable: false,
  })
    init: string;

  @Column({
    name: 'end',
    type: 'varchar',
    length: 64,
    nullable: false,
  })
    end: string;

  @Column({
    name: 'mid',
    type: 'varchar',
    length: 64,
    nullable: false,
  })
    mid: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'now()',
  })
    createdAt: Date;

}
