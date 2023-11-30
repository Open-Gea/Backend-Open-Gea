import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { IrrigationSystems, Objective } from '../../models/soilReg/IrrigationSystems';

@Entity({ name: 'irrigation' })
export class IrrigationSystemsEntity implements IrrigationSystems {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lot: string;

  @Column({ type: 'enum', enum: Objective, nullable: true })
  goal: Objective;

  @Column({ type: 'varchar', length: 200, nullable: true })
  otherGoal: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  tasks: string;

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  materials: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  budget: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  currency: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  personInCharge: string;

  
  @Column({ type: 'text', nullable: true })
  notesObservations: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  materialsAndWasteList: string;


  @Column({ type: 'varchar', length: 255, nullable: true })
  management: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  year: string;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

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
