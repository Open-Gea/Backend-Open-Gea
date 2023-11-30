import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { User } from '../../models/user/user';
import { Type, Goal, Tillage } from '../../models/soilReg/Tillage';

@Entity({ name: 'tillage' })
export class TillageEntity implements Tillage  {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ type: 'varchar', length: 100, nullable: true })
  lot: string;
  
  @Column({ type: 'varchar', length: 4, nullable: true })
  year: string;
  
  @Column({ type: 'varchar', length: 100, nullable: true })
  type: Type;
  
  @Column({ type: 'varchar', length: 100, nullable: true })
  goal: Goal;
  
  @Column({ type: 'varchar', length: 100, nullable: true })
  otherGoal: string;
  
  @Column({ type: 'varchar', length: 100, nullable: true })
  machineryUsed: string;

  @Column({ type: 'date', nullable: true })
  dateWork: Date;

  @Column({ type: 'numeric', nullable: true })
  numberPassesPerWork: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  tasks: string;

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  necessaryMaterial: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  budget: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  notes: string;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  personInCharge: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  currency: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user: User;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'now()',
  })
    createdAt: Date;

  
}
