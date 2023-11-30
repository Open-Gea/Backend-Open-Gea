import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { User } from '../../models/user/user';
import { CoverManagement, Types } from '../../models/soilReg/CoverManagement';

@Entity({ name: 'covermanagement' })
export class CoverManagementEntity implements CoverManagement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lot: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  species: string;

  @Column({ type: 'date', nullable: true })
  plantingDate: Date;

  @Column({ type: 'date', nullable: true })
  harvestDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  precedingCrop: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  tasks: string;

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  material: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  datePlacement: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  budget: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  quantityMaterial: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  type: Types;

  @Column({ type: 'varchar', length: 4, nullable: true })
  year: string;

  @Column({ type: 'boolean', default: false })
  completed: boolean;
  

  @Column({ type: 'varchar', length: 100, nullable: true })
  currency: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  personInCharge: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  goal: string;
  
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
