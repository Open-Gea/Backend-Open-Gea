import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Evaluation, EvaluationStatus, evotranspirationInterface } from '../../models/waterFootprint/evaluation';
import { Farm } from '../../models/farm/farm';
import { Product } from '../../models/product/product';
import { User } from '../../models/user/user';
import { FarmEntity } from '../farm/farm.entity';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'evaluations' })
export class EvaluationEntity implements Evaluation {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ name: 'register_date', type: 'timestamp', nullable: false })
    registerDate: Date;

  @Column({ name: 'evotranspiration', type: 'jsonb', nullable: false })
    evotranspiration: evotranspirationInterface;

  @Column({ name: 'start_date', type: 'timestamp', nullable: false })
    startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp', nullable: false })
    endDate: Date;

  @Column({ name: 'hectares', type: 'float', nullable: false, default: 0})
    hectares: number;

  @Column({ name: 'tons', type: 'float', nullable: false, default: 0 })
    tons: number;

  @Column({ name: 'score', type: 'float', nullable: false ,default: 0 })
    score: number;

  @ManyToOne(() => FarmEntity, (farm) => farm.id, { nullable: false })
  @JoinColumn({ name: 'farm', referencedColumnName: 'id' })
    farm: Farm;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
    user: User;

  @ManyToOne(() => ProductEntity, (prod) => prod.id, { nullable: false })
  @JoinColumn({ name: 'product', referencedColumnName: 'id' })
    product: Product; 

  /*
  @ManyToOne(() => CarbonFootprint, (carbFoot) => carbFoot.id , {nullable:false})
  @JoinColumn({name: 'carbon_footprint', referencedColumnName: 'id'})
    carbon_footprint: CarbonFootprint
*/

  @Column({ name: 'status', type: 'enum', enum: EvaluationStatus, default: EvaluationStatus.PENDING, nullable: false })
    status: EvaluationStatus;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: () => 'now()' })
    createdAt: Date;

}
