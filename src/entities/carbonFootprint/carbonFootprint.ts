import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CarbonFootPrint } from '../../models/carbonFootprint/carbonFootprint';
import { FarmEntity } from '../farm/farm.entity';
import { Farm } from '../../models/farm/farm';
import { EmissionFactorEntity } from './emissionFactor.entity';
import { EmissionFactor } from '../../models/carbonFootprint/emissionFactor';

@Entity({ name: 'carbon_footprint' })
export class CarbonFootPrintEntity implements CarbonFootPrint {
  @PrimaryGeneratedColumn('uuid')
    id: string;
	
	@ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: false })
	@JoinColumn({ name: 'farm', referencedColumnName: 'id' })
		farm: Farm;
	
	@ManyToOne(() => EmissionFactorEntity, (emissionFactor) => emissionFactor.id, { nullable: false })
	@JoinColumn({ name: 'emissionFactor', referencedColumnName: 'id' })
		emissionFactor: EmissionFactor;

  @Column({ name: 'result', type: 'float', nullable: false })
    result: number;

  @Column({ name: 'consumption', type: 'float', nullable: false })
		consumption: number;

	@Column({ name: 'year', type: 'varchar', nullable: false })
		year: string;

	@Column({ name: 'created_at', type: 'timestamp', nullable: false, default: () => 'now()' })
		createdAt: Date;

}


