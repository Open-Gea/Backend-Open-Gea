import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { Fertilization, FertilizationType, Goal } from '../../models/soilReg/Fertilization';

@Entity({ name: 'fertilization' })
export class FertilizationEntity implements Fertilization {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lot: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fertilizationType: FertilizationType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cultivatedSpecies: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  goal: Goal;

  @Column({ type: 'text', nullable: true })
  tasks: string;

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  budget: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  year: string;

  @Column({ type: 'boolean', default: false })
  completed: boolean;
  

  @Column({ type: 'varchar', length: 10, nullable: true })
  currency: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  personInCharge: string;


  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user: UserEntity;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'now()',
  })
    createdAt: Date;

}
